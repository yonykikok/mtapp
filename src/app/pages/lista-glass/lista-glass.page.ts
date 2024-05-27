import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { User } from 'src/app/clases/user';
import { FormAltaGlassComponent } from 'src/app/components/forms/form-alta-glass/form-alta-glass.component';
import { DetalleGlassComponent } from 'src/app/components/views/detalle-glass/detalle-glass.component';
import { AuthService } from 'src/app/services/auth.service';
import { DataBaseService } from 'src/app/services/database.service';
import { FuncionesUtilesService } from 'src/app/services/funciones-utiles.service';
import { ToastColor, ToastService } from 'src/app/services/toast.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-lista-glass',
  templateUrl: './lista-glass.page.html',
  styleUrls: ['./lista-glass.page.scss'],
})
export class ListaGlassPage implements OnInit {
  loggedUser!: User;
  camposSeleccionados = ['marca', 'modelo', 'precio'];
  glasses: any[] = [];
  glassesAMostrar: any[] = [];

  mostrarFormGlass = true;

  constructor(private dataBase: DataBaseService,
    private authService: AuthService,
    public funcionesUtiles: FuncionesUtilesService,
    private modalController: ModalController,
    private database: DataBaseService,
    private toastService: ToastService) {

    this.getCurrentUser();
    this.glassesAMostrar = [...this.glasses];
  }
  ngOnInit(): void {

    let lista = [];
    this.dataBase.obtenerTodos(environment.TABLAS.glasses).subscribe((docsGlasssRef: any) => {
      if (docsGlasssRef.length <= 0) return;
      lista = docsGlasssRef.map((element: any) => {
        let auxElement = element.payload.doc.data();
        auxElement['id'] = element.payload.doc.id;
        return auxElement;
      });
      lista = this.ordenarListaPor(lista, 'modelo', 'precio');
      this.glasses = lista;
      this.glassesAMostrar = [...this.glasses];
    });


  }

  ordenarListaPor(lista: any[], criterio: string, criterio2: string) {
    return lista.sort((a, b) => a[criterio].localeCompare(b[criterio]) || a[criterio2] - b[criterio2]);
  }

  async seleccionar(glass: any) {
    try {
      const modal = await this.modalController.create({
        component: DetalleGlassComponent,
        componentProps: {
          repuesto: glass,
          ruta: '/repuestos/lista-glasses',
          glassesCargados: [...this.glasses]
        },
      })

      modal.onDidDismiss().then(async (result: any) => {
        if (!result.data || !result.role) return;

        if (result.role == 'guardar') {
          try {
            await this.database.actualizar(environment.TABLAS.glasses, result.data, result.data.id);
          } catch (err) {
            this.toastService.simpleMessage('Error', 'No se pudo actualizar', ToastColor.danger);
          }
        } else if (result.role == 'borrar') {
          this.database.eliminar(environment.TABLAS.glasses, result.data.id).then(() => {
            this.toastService.simpleMessage('Exito', 'Glass borrado con exito', ToastColor.success);

          }).catch((err: Error) => {
            this.toastService.simpleMessage('Error', 'No se pudo borrar el glass', ToastColor.danger);
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
    this.glassesAMostrar = this.glasses.filter((d) => d.modelo.toLowerCase().indexOf(query) > -1);
  }


  async abrirFormGlass() {
    try {
      const modal = await this.modalController.create({
        component: FormAltaGlassComponent,
        componentProps: {
          glassesCargados: this.glasses
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
