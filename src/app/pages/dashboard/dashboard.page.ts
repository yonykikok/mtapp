import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';
import { ModalController } from '@ionic/angular';
import { Roles } from 'src/app/clases/user';
import { FormAltaReparacionComponent } from 'src/app/components/forms/form-alta-reparacion/form-alta-reparacion.component';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { DataBaseService } from 'src/app/services/database.service';
import { FuncionesUtilesService } from 'src/app/services/funciones-utiles.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  reparaciones;
  reparacionesAMostrar;
  codigoEscaneado;
  productosEscaneados = [];
  productos = [{
    nombre: 'cargador',
    codigo: "7798113301765",
  }];
  modulos: { titulo: string, color: string, ruta: string, role: Roles, img?: string }[] = [
    // { titulo: 'Tactiles', color: '#42688a', ruta: "/lista-tactiles", role: 'CLIENTE' },
    // { titulo: 'Display', color: '#238386', ruta: "/lista-displays", role: 'CLIENTE' },
    // { titulo: 'Modulos', color: '#28a745', ruta: "/lista-modulos", role: 'CLIENTE' },
    // { titulo: 'Baterias', color: '#ffc107', ruta: "/lista-baterias", role: 'CLIENTE' },
    // { titulo: 'Flex de carga', color: '#d34fb2', ruta: "/lista-flex-de-carga", role: 'CLIENTE' },
    { titulo: 'Mis reparaciones', color: '#d34fb2', ruta: "/mis-reparaciones", role: 'CLIENTE', img: '/assets/svg/icons/reparaciones.svg' },
    { titulo: 'Repuestos', color: 'rgb(79 132 211)', ruta: "/repuestos", role: 'CLIENTE', img: '/assets/svg/icons/btnRepuestos.png' },
    { titulo: 'Pedidos', color: '#007bff', ruta: "/lista-pedidos", role: 'EMPLEADO', img: '/assets/svg/icons/pedidos.svg' },
    { titulo: 'Ventas', color: '#7fbdc7', ruta: "/equipos-vendidos", role: 'EMPLEADO', img: '/assets/svg/icons/ventas.svg' },
    { titulo: 'Libro diario', color: '#dc70fd', ruta: "/libro-diario", role: 'EMPLEADO', img: '/assets/svg/icons/librodiario.svg' },
    { titulo: 'Stock Modulos', color: 'rgb(103 102 102)', ruta: "/stock-modulos", role: 'EMPLEADO', img: '/assets/svg/icons/stock.svg' },
    { titulo: 'Boletas', color: 'rgb(149 157 126)', ruta: "/boletas", role: 'EMPLEADO', img: '/assets/svg/icons/boletas.svg' },
    { titulo: 'Cuentas clientes', color: '#dc3545', ruta: "/cuentas-clientes", role: 'ADMIN', img: '/assets/svg/icons/deudores2.svg'},
    { titulo: 'Historial', color: 'rgb(113 112 253)', ruta: "/historial-caja", role: 'ADMIN', img: '/assets/svg/icons/historial.svg' },
    { titulo: 'Trabajos tercerizados', color: 'rgb(141 205 119)', ruta: "/trabajos-tercerizados", role: 'ADMIN', img: '/assets/svg/icons/delegar.svg' },
    { titulo: 'Proveedores', color: 'rgb(149 57 126)', ruta: "/proveedores", role: 'OWNER', img: '/assets/svg/icons/proveedores.svg' },
    { titulo: 'Usuarios', color: 'rgb(149 57 126)', ruta: "/lista-de-usuarios", role: 'OWNER', img: '/assets/svg/icons/usuarios.svg' },
  ];

  loggedUser;
  constructor(private modalController: ModalController,
    private database: DataBaseService,
    private barcodeScanner: BarcodeScanner,
    private alertService: AlertService,
    public funcionesUtiles: FuncionesUtilesService,
    private authService: AuthService) { }

  ngOnInit() {
    this.getCurrentUser();
    this.database.obtenerTodos('boletas').subscribe(documentListRef => {

      if (!documentListRef) return;

      this.reparaciones = documentListRef.map(documentRef => {
        let reparacion = documentRef.payload.doc.data();
        reparacion['id'] = documentRef.payload.doc.id;
        return reparacion;
      });
      this.reparacionesAMostrar = [...this.reparaciones];

      this.reparaciones.sort((a, b) => {
        if (a.estado > b.estado) {
          return -1
        } else if (a.estado < b.estado) {
          return 1
        } else {
          return 0
        }
      });
    });
  }



  getCurrentUser() {
    this.authService.getCurrentUser().subscribe((userRef: any) => {
      this.database.obtenerPorId(environment.TABLAS.users, userRef.uid).subscribe((res: any) => {
        let usuario: any = res.payload.data();
        usuario['uid'] = res.payload.id;

        this.loggedUser = {
          uid: usuario['uid'],
          email: usuario['email'],
          displayName: usuario['displayName'],
          emailVerified: usuario['emailVerified'],
          photoURL: usuario['photoURL'],
          role: usuario['role'],
          securityCode: usuario['securityCode']
        };
      })
    })
  }

  async mostrarModalFormAltaReparacion() {
    let modal = await this.modalController.create({
      component: FormAltaReparacionComponent,
      componentProps: {
        ruta: 'dashboard'
      },
      mode: 'ios',
    });
    modal.present();

  }
  abrirScanner() {
    // let options = {
    //   formats: "QR_CODE,PDF_417"
    // }

    this.barcodeScanner.scan().then(barcodeData => {
      if (barcodeData.cancelled) return;

      if (barcodeData.text) {
        this.codigoEscaneado = barcodeData.text;
        this.productosEscaneados = [...this.productosEscaneados, this.productos.find((prod: any) => prod.codigo == barcodeData.text)];
        alert(JSON.stringify(this.productosEscaneados));
      }
      // this.scannerResultEvent.emit(barcodeData);
      console.log("------------------", barcodeData);
      console.log("------------------", JSON.stringify(barcodeData));
    }).catch(err => {
      console.error('Error', err);
    });

  }

  ejecutarBackup() {
    return;
    let sus = this.database.obtenerTodos(environment.TABLAS.ingresosBrutos).subscribe(mesListRef => {
      sus.unsubscribe();
      let meses: any = mesListRef.map(mesRef => {
        let mes = mesRef.payload.doc.data();
        mes['id'] = mesRef.payload.doc.id;
        return mes;
      });
      console.log(meses)
      meses.forEach(mes => {
        this.database.actualizar(environment.TABLAS.backUps, mes, mes.id);
      })

    })
  }


  AgregarBackUpDiario() {
    const months = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
    let newDate = new Date();
    let month = months[newDate.getMonth()];
    let year = newDate.getFullYear();
    let haceFaltaActualizarElBackUp = false;

    let subscripcion = this.database.obtenerPorId(environment.TABLAS.ingresosBrutos, `${month}${year}`).subscribe(async (res) => {
      subscripcion.unsubscribe();
      let mes: any = res.payload.data();
      mes['id'] = res.payload.id;
      console.log(mes)
      let subscripcion2 = this.database.obtenerPorId(environment.TABLAS.backUps, `${month}${year}`).subscribe(async (res) => {
        subscripcion2.unsubscribe();
        if (res.payload.exists) {
          let mesBackUp: any = res.payload.data();
          mesBackUp['id'] = res.payload.id;
          console.log(mesBackUp)

          if (mes.dias && mesBackUp.dias) {

            if (mes.dias.length > mesBackUp.dias.length) {
              haceFaltaActualizarElBackUp = true;
            } else if (mes.dias.length == mesBackUp.dias.length) {
              if ((mes.dias[mes.dias.length - 1].ventas.length > mesBackUp.dias[mesBackUp.dias.length - 1].ventas.length)) {
                haceFaltaActualizarElBackUp = true;
              }
            }
            else {
              console.log("NO ACTUALIZAMOS!");
            }
          }

        } else {
          console.log("creamos el backup de ese mes")
          haceFaltaActualizarElBackUp = true;
        }

        if (haceFaltaActualizarElBackUp) {
          this.database.actualizar(environment.TABLAS.backUps, mes, mes.id);
        }
      })

    });


  }

  confirmarBackUpDiario() {
    this.alertService.alertConfirmacion('Confirmación',
      '¿Quiere hacer la copia de seguridad ahora? <br><br> <b>SIEMPRE HACER AL FINAL DEL DIA</b>',
      'Si, Hacer ahora',
      () => {
        this.AgregarBackUpDiario();
      });
  }
}
