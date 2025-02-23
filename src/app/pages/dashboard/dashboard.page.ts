import { Component, OnInit } from '@angular/core';
// import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';
import { ModalController } from '@ionic/angular';
import { Roles, User } from 'src/app/clases/user';
import { FormAltaReparacionComponent } from 'src/app/components/forms/form-alta-reparacion/form-alta-reparacion.component';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { DataBaseService } from 'src/app/services/database.service';
import { FuncionesUtilesService } from 'src/app/services/funciones-utiles.service';
import { environment } from 'src/environments/environment';
import { boleta } from '../mis-reparaciones/mis-reparaciones.page';
import { StorageService } from 'src/app/services/storage.service';
import { roles } from 'src/app/services/info-compartida.service';
import { Bateria } from 'src/app/components/forms/form-bateria/form-bateria.component';

export interface EspecificacionesEquipo {
  marca: string;
  modelo: string;
  especificaciones?: {
    pantalla: number;
    resolucion: string;
    camaraFrontal: number;
    memoria: number;
    almacenamiento: number;
    procesador: string;
    camaraPrincipal: number;
  };
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  reparaciones: boleta[] = [];
  reparacionesAMostrar: boleta[] = [];
  codigoEscaneado: string = '';
  productosEscaneados = [];
  productos = [{
    nombre: 'cargador',
    codigo: "7798113301765",
  }];
  modulos: { titulo: string, color: string, ruta: string, role: Roles, img?: string }[] = [
    { titulo: 'Prototipo', color: '#3a6686', ruta: "/nuevo-libro-diario", role: roles.EMPLEADO, img: '/assets/svg/icons/librodiario.svg' },
    // { titulo: 'Libro diario', color: '#3a6686', ruta: "/libro-diario", role: roles.EMPLEADO, img: '/assets/svg/icons/librodiario.svg' },
    { titulo: 'Reparaciones', color: '#3a6686', ruta: "/reparaciones-new-version", role: roles.CLIENTE, img: '/assets/svg/icons/btnRepuestos.png' },
    { titulo: 'Pedidos', color: '#3a6686', ruta: "/lista-pedidos", role: roles.EMPLEADO, img: '/assets/svg/icons/pedidos.svg' },
    { titulo: 'Historial', color: '#3a6686', ruta: "/historial-caja-new", role: roles.ADMIN, img: '/assets/svg/icons/historial.svg' },
    { titulo: 'Lista productos', color: '#3a6686', ruta: "/lista-productos", role: roles.ST, img: '/assets/svg/icons/articulos.png' },
    { titulo: 'Stock Modulos', color: '#3a6686', ruta: "/stock-modulos", role: roles.EMPLEADO, img: '/assets/svg/icons/stock.svg' },
    { titulo: 'Boletas', color: '#3a6686', ruta: "/boletas", role: roles.EMPLEADO, img: '/assets/svg/icons/boletas.svg' },
    { titulo: 'Equipos', color: '#3a6686', ruta: "/equipos", role: roles.CLIENTE, img: '/assets/svg/icons/celulares.png' },
    // { titulo: 'Trabajos', color: 'rgb(29 189 215)', ruta: "/servicios", role: roles.EMPLEADO, img: '/assets/svg/icons/servicios.svg' },
    { titulo: 'Cuentas clientes', color: '#3a6686', ruta: "/cuentas-clientes", role: roles.ADMIN, img: '/assets/svg/icons/deudores2.svg' },
    { titulo: 'Mis reparaciones', color: '#3a6686', ruta: "/mis-reparaciones", role: roles.CLIENTE, img: '/assets/svg/icons/reparaciones.svg' },
    { titulo: 'Trabajos tercerizados', color: '#3a6686', ruta: "/trabajos-tercerizados", role: roles.EMPLEADO, img: '/assets/svg/icons/delegar.svg' },
    { titulo: 'Proveedores', color: '#3a6686', ruta: "/proveedores", role: roles.OWNER, img: '/assets/svg/icons/proveedores.svg' },
    { titulo: 'Usuarios', color: '#3a6686', ruta: "/lista-de-usuarios", role: roles.OWNER, img: '/assets/svg/icons/usuarios.svg' },
    // { titulo: 'Articulos', color: '#dc70fd', ruta: "/articulos", role: roles.EMPLEADO, img: '/assets/svg/icons/articulos.png' },
  ];

  loggedUser!: User;
  constructor(private modalController: ModalController,
    private database: DataBaseService,
    // private barcodeScanner: BarcodeScanner,
    private alertService: AlertService,
    private storageService: StorageService,
    public funcionesUtiles: FuncionesUtilesService,
    private authService: AuthService) { }

  ngOnInit() {
    // this.database.crearConCustomId(environment.TABLAS.calidadesDeRepuestos, 'baterias', {
    //   calidades: [
    //     "ORIGINAL",
    //     "ORIGINAL CON CHIP",
    //     "MARCA MECHANIC",
    //     "MECHANIC",
    //     "BUENA",
    //     "FOXCONN",
    //     "AMPSENTRIXX"
    //   ]
    // })

    // let baterias: any = [...samsung, ...lg, ...motorola, ...huawei, ...apple, ...xiaomi];
    // baterias = baterias.map((bateria: any) => {
    //   // Separa la marca y modelo
    //   const [marca, ...restoModelo] = bateria.modelo.split(" ");

    //   // Agrega propiedades y elimina las que no necesitas
    //   bateria.marca = marca;
    //   bateria.modelo = restoModelo.join(" ");
    //   bateria.costo = bateria.precio_unitario;

    //   delete bateria.precio_total;
    //   delete bateria.precio_unitario;

    //   return bateria;
    // });
    // let contador = 1;
    // baterias.forEach((bat: Bateria) => {
    //   this.database.crear(environment.TABLAS.baterias, bat).then(res => {
    //     contador++;
    //   })
    // });

    // console.log(baterias);




    // let calidades = baterias.map((producto: any) => producto.calidad)
    //   .filter((calidad: any, index: any, array: any) => array.indexOf(calidad) === index);
    // console.log(calidades)

    this.getCurrentUser();
    this.database.obtenerTodos('boletas').subscribe(documentListRef => {

      if (!documentListRef) return;

      this.reparaciones = documentListRef.map(documentRef => {
        let reparacion = documentRef.payload.doc.data() as boleta;
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

    // this.barcodeScanner.scan().then(barcodeData => {
    //   if (barcodeData.cancelled) return;

    //   if (barcodeData.text) {
    //     this.codigoEscaneado = barcodeData.text;
    //     this.productosEscaneados = [...this.productosEscaneados, this.productos.find((prod: any) => prod.codigo == barcodeData.text)];
    //     alert(JSON.stringify(this.productosEscaneados));
    //   }
    //   // this.scannerResultEvent.emit(barcodeData);
    // }).catch(err => {
    //   console.error('Error', err);
    // });

  }

  borrarimagen() {
    this.storageService.borrarImagen('equipos_vendidos/apple-37755134-353535353535365').then(res => {

    }).catch(err => {
      console.error(err)
    })
  }

  segmentChanged(algo: any) {
    console.log(algo)

  }

  manejarPatronCompletado(patron: number[]) {
    console.log('Patrón ingresado:', patron);
  }

  manejarValidacion(esValido: boolean) {
    if (esValido) {
      console.log('Patrón correcto');
    } else {
      console.log('Patrón incorrecto');
    }
  }
}
