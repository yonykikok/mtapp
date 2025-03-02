import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { LoadingController, ModalController } from '@ionic/angular';
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
  mostrarCosto:boolean=false;
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
    private loadingCtrl:LoadingController,
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

      this.modulos.map(mod => {
        mod = this.ajustarPrecio(mod);
      });
      console.log(this.modulos)

      this.modulosAMostrar = [...this.modulos];


      // this.modulos.forEach(mod=>{
      //   this.dataBase.actualizar(environment.TABLAS.modulos, mod, mod.id)?.then(() => {
      //     console.log("ok")
      //   });
      // })

    });


  }

  ajustarPrecio(producto: any) {
    const precioFinanciero = producto.detallesFinancieros.costo +
      producto.detallesFinancieros.margen +
      producto.detallesFinancieros.colocacion;

    if (producto.precio > precioFinanciero) {
      // Ajustar colocación para que el precio financiero sea igual al producto.precio
      producto.detallesFinancieros.colocacion += (producto.precio - precioFinanciero);
      producto.detallesFinancieros.precio = (producto.detallesFinancieros.costo + producto.detallesFinancieros.margen + producto.detallesFinancieros.colocacion);
    } else if (producto.precio < precioFinanciero) {
      // Ajustar producto.precio para que sea igual al precio financiero
      producto.precio = precioFinanciero;
    }

    return producto;
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
          ruta: '/reparaciones-new-version',
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

  async guardar(e: Event, modulo: Modulo) {
    e.stopPropagation();
    if (modulo.id) {
      const loading = await this.loadingCtrl.create({
        message: 'Guardando...',
        spinner: 'crescent', // Puedes cambiarlo a 'dots', 'bubbles', etc.
      });
    
      await loading.present(); // Muestra el spinner
    
      try {
        await this.dataBase.actualizar(environment.TABLAS.modulos, modulo, modulo.id);
        this.toastService.simpleMessage('Guardado', 'Se actualizó el valor', ToastColor.success);
      } catch (error) {
        this.toastService.simpleMessage('Error', 'No se pudo actualizar', ToastColor.danger);
      } finally {
        await loading.dismiss(); // Oculta el spinner
      }
    }
  }
  actualizarDatosFinancieros(modulo: Modulo) {
    modulo.detallesFinancieros.precio = modulo.detallesFinancieros.costo + modulo.detallesFinancieros.colocacion + modulo.detallesFinancieros.margen;
    console.log(modulo.detallesFinancieros.precio);


  }
}