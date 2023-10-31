import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { User } from 'src/app/clases/user';
import { FormFlexDeCargaComponent } from 'src/app/components/forms/form-flex-de-carga/form-flex-de-carga.component';
import { DetalleFlexDeCargaComponent } from 'src/app/components/views/detalle-flex-de-carga/detalle-flex-de-carga.component';
import { AuthService } from 'src/app/services/auth.service';
import { DataBaseService } from 'src/app/services/database.service';
import { FuncionesUtilesService } from 'src/app/services/funciones-utiles.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-lista-flex-de-carga',
  templateUrl: './lista-flex-de-carga.page.html',
  styleUrls: ['./lista-flex-de-carga.page.scss'],
})
export class ListaFlexDeCargaPage implements OnInit {

  loggedUser!: User;
  camposSeleccionados = ['modelo', 'calidad', 'precio'];
  flexDeCargas: any[] = [];
  flexDeCargasAMostrar: any[] = [];

  precioDolarBlue: number = 0;
  mostrarFormModulo = true;

  dolarObservable$: Observable<number> | null = null;
  constructor(private dataBase: DataBaseService,
    private authService: AuthService,
    public funcionesUtiles: FuncionesUtilesService,
    private modalController: ModalController,
    private router:Router) {

    this.getCurrentUser();
    this.flexDeCargasAMostrar = [...this.flexDeCargas];
  }
  ngOnInit(): void {
    // return;
    if (this.funcionesUtiles.customDolar) {
      this.precioDolarBlue = this.funcionesUtiles.customDolar;
    }

    this.funcionesUtiles.getPriceDolar().subscribe(newPrice => this.precioDolarBlue = newPrice);

    let lista = [];
    this.dataBase.obtenerTodos(environment.TABLAS.flexs).subscribe((docsModulosRef) => {
      if (docsModulosRef.length <= 0) return;
      lista = docsModulosRef.map((element: any) => {
        let auxElement = element.payload.doc.data();
        auxElement['id'] = element.payload.doc.id;
        return auxElement;
      });
      lista = this.ordenarListaPor(lista, 'modelo', 'precio');
      this.flexDeCargas = lista;
      this.flexDeCargasAMostrar = [...this.flexDeCargas];
    });


  }

  ordenarListaPor(lista: any[], criterio: string, criterio2: string) {
    return lista.sort((a, b) => a[criterio].localeCompare(b[criterio]) || a[criterio2] - b[criterio2]);
  }

  async seleccionar(flexDeCarga: any) {
    try {
      const modal = await this.modalController.create({
        component: DetalleFlexDeCargaComponent,
        componentProps: {
          repuesto: flexDeCarga
        },
      })

      modal.onDidDismiss().then((result: any) => {
        if (!result.data || !result.role) return;


      })
      return await modal.present();
    } catch (err) {
    }

  }

  getCurrentUser() {
    this.authService.getCurrentUser().subscribe((userRef: any) => {
      if (!userRef||!userRef.uid) {
        this.router.navigate(["/login"]);
return;
      }
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
    this.flexDeCargasAMostrar = this.flexDeCargas.filter((d) => d.modelo.toLowerCase().indexOf(query) > -1);
  }


  async abrirFormModulo() {
    try {
      const modal = await this.modalController.create({
        component: FormFlexDeCargaComponent,
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
