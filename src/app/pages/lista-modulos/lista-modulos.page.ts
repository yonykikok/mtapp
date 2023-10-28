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
import { ToastColor, ToastService } from 'src/app/services/toast.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-lista-modulos',
  templateUrl: './lista-modulos.page.html',
  styleUrls: ['./lista-modulos.page.scss'],
})
export class ListaModulosPage implements OnInit {
  loggedUser!: User;
  camposSeleccionados = ['modelo', 'calidad', 'precio'];
  modulos: any[] = [];
  modulosAMostrar: any[] = [];

  precioDolarBlue: number = 0;
  mostrarFormModulo = true;

  dolarObservable$: Observable<number> | null = null;
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
    if (this.funcionesUtiles.customDolar) {
      this.precioDolarBlue = this.funcionesUtiles.customDolar;
    }

    this.funcionesUtiles.getPriceDolar().subscribe(newPrice => this.precioDolarBlue = newPrice);

    let lista = [];
    this.dataBase.obtenerTodos(environment.TABLAS.modulos).subscribe((docsModulosRef: any) => {
      if (docsModulosRef.length <= 0) return;
      lista = docsModulosRef.map((element: any) => {
        let auxElement = element.payload.doc.data();
        auxElement['id'] = element.payload.doc.id;
        return auxElement;
      });
      lista = this.ordenarListaPor(lista, 'modelo', 'precio');
      this.modulos = lista;
      this.modulosAMostrar = [...this.modulos];
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
          ruta: '/repuestos/lista-modulos'
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

}