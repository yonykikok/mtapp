import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { User } from 'src/app/clases/user';
import { FormModuloComponent } from 'src/app/components/forms/form-modulo/form-modulo.component';
import { DetalleModuloComponent } from 'src/app/components/views/detalle-modulo/detalle-modulo.component';
import { AuthService } from 'src/app/services/auth.service';
import { DataBaseService } from 'src/app/services/database.service';
import { FuncionesUtilesService } from 'src/app/services/funciones-utiles.service';
import { Modulo } from 'src/app/services/info-compartida.service';
import { ToastColor, ToastService } from 'src/app/services/toast.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-lista-modulos',
  templateUrl: './lista-modulos.page.html',
  styleUrls: ['./lista-modulos.page.scss'],
})
export class ListaModulosPage implements OnInit {
  @Input() modoComponent: boolean = false;
  loggedUser!: User;
  camposSeleccionados = ['modelo', 'calidad', 'precio'];
  modulos: any[] = [];
  modulosAMostrar: any[] = [];

  precioDolarBlue: number = 0;
  mostrarFormModulo = true;

  constructor(private dataBase: DataBaseService,
    private authService: AuthService,
    public funcionesUtiles: FuncionesUtilesService,
    private modalController: ModalController,
    private database: DataBaseService,
    private toastService: ToastService) {

    this.getCurrentUser();
    this.modulosAMostrar = [...this.modulos];
  }
  ngOnInit(): void {

    this.database.obtenerPorId(environment.TABLAS.cotizacion_dolar, 'dolarBlue').subscribe((res: any) => {
      this.precioDolarBlue = res.payload.data().price;
    });

    let lista = [];
    let subs = this.dataBase.obtenerTodos(environment.TABLAS.modulos).subscribe((docsModulosRef: any) => {
      subs.unsubscribe();
      if (docsModulosRef.length <= 0) return;
      lista = docsModulosRef.map((element: any) => {
        let auxElement: Modulo = element.payload.doc.data();
        auxElement['id'] = element.payload.doc.id;
        if (!auxElement.detallesFinancieros) {
          auxElement.detallesFinancieros = {
            colocacion: 14,
            costo: 0,
            margen: 4,
            precio: 0 + 4 + 14,
          }
        }
        return auxElement;
      });
      lista = this.ordenarListaPor(lista, 'modelo', 'precio');
      this.modulos = lista;
      this.modulosAMostrar = [...this.modulos];

      // let calidadesModulos = ['AAA', 'GenMedCalidad', 'GenBueno', 'Estandar', 'Original Oled', 'Original Certificado'];

      // this.modulos.forEach((placa: any) => {

      //   switch (placa.calidad) {
      //     case 'AAA':
      //       placa.detallesFinancieros = {
      //         colocacion: 14,
      //         costo: 0,
      //         margen: 4,
      //         precio: 0 + 4 + 14,
      //       }
      //       break;
      //     case 'GenMedCalidad':
      //     case 'GenBueno':
      //     case 'Estandar':
      //       placa.detallesFinancieros = {
      //         colocacion: 14,
      //         costo: 0,
      //         margen: 4,
      //         precio: 0 + 4 + 14,
      //       }
      //       break;
      //     case 'Original Oled':
      //       placa.detallesFinancieros = {
      //         colocacion: 14,
      //         costo: 0,
      //         margen: 4,
      //         precio: 0 + 4 + 14,
      //       }
      //       break;

      //     default:
      //       break;
      //   }

      //   let nuevaPlaca = placa;

      //   console.log(placa)
      //   // this.dataBase.actualizar(environment.TABLAS.modulos, nuevaPlaca, nuevaPlaca.id)?.then(() => {
      //   //   console.log("ok")
      //   // });
      // });
    });


  }

  ordenarListaPor(lista: any[], criterio: string, criterio2: string) {
    return lista.sort((a, b) => a[criterio].localeCompare(b[criterio]) || a[criterio2] - b[criterio2]);
  }

  async seleccionar(modulo: any) {
    try {
      const modal = await this.modalController.create({
        component: DetalleModuloComponent,
        componentProps: {
          repuesto: modulo,
          ruta: '/repuestos/lista-modulos',
          funcionesUtiles: this.funcionesUtiles,
          loggedUser: this.loggedUser
        },
      })

      modal.onDidDismiss().then(async (result: any) => {
        if (!result.data || !result.role) return;

        if (result.role == 'guardar') {
          try {
            await this.database.actualizar(environment.TABLAS.modulos, result.data, result.data.id);
          } catch (err) {
            this.toastService.simpleMessage('Error', 'No se pudo actualizar', ToastColor.danger);
          }
        } else if (result.role == 'borrar') {
          this.database.eliminar(environment.TABLAS.modulos, result.data.id).then(() => {
            this.toastService.simpleMessage('Exito', 'Modulo borrado con exito', ToastColor.success);

          }).catch((err: Error) => {
            this.toastService.simpleMessage('Error', 'No se pudo borrar el modulo', ToastColor.danger);
          })
        }


      })
      return await modal.present();
    } catch (err) {
    }

  }


  getCurrentUser() {
    this.authService.getCurrentUser().subscribe((userRef: any) => {
      this.dataBase.obtenerPorId(environment.TABLAS.users, userRef.uid).subscribe((res: any) => {
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
  handleInput(event: any) {
    const query = event.target.value.toLowerCase();
    this.modulosAMostrar = this.modulos.filter((d) => d.modelo.toLowerCase().indexOf(query) > -1);
  }


  async abrirFormModulo() {
    try {
      const modal = await this.modalController.create({
        component: FormModuloComponent,
        componentProps: {
        },
      })

      modal.onDidDismiss().then((result: any) => {
        if (!result.data || !result.role) return;


      })
      return await modal.present();
    } catch (err) {
    }

  }

  guardar(e: Event, modulo: Modulo) {
    e.stopPropagation();
    if (modulo.id) {
      this.dataBase.actualizar(environment.TABLAS.modulos, modulo, modulo.id);
    }

  }
  actualizarDatosFinancieros(modulo: Modulo) {
    modulo.detallesFinancieros.precio = modulo.detallesFinancieros.costo + modulo.detallesFinancieros.colocacion + modulo.detallesFinancieros.margen;
    console.log(modulo.detallesFinancieros.precio);


  }
}