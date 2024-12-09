import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { User } from 'src/app/clases/user';
import { Bateria, FormBateriaComponent } from 'src/app/components/forms/form-bateria/form-bateria.component';
import { DetalleBateriaComponent } from 'src/app/components/views/detalle-bateria/detalle-bateria.component';
import { AuthService } from 'src/app/services/auth.service';
import { DataBaseService } from 'src/app/services/database.service';
import { FuncionesUtilesService } from 'src/app/services/funciones-utiles.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-lista-baterias',
  templateUrl: './lista-baterias.page.html',
  styleUrls: ['./lista-baterias.page.scss'],
})
export class ListaBateriasPage implements OnInit {
  @Input() modoComponent: boolean = false;

  loggedUser!: User;
  camposSeleccionados = ['modelo', 'calidad', 'precio'];
  baterias: Bateria[] = [];
  bateriasAMostrar: Bateria[] = [];

  precioDolarBlue: number = 0;
  mostrarFormModulo = true;

  constructor(private dataBase: DataBaseService,
    private authService: AuthService,
    public funcionesUtiles: FuncionesUtilesService,
    private modalController: ModalController) {

    this.getCurrentUser();
    this.bateriasAMostrar = [...this.baterias];
  }
  ngOnInit(): void {


    this.dataBase.obtenerPorId(environment.TABLAS.cotizacion_dolar, 'dolarBlue').subscribe((res: any) => {
      this.precioDolarBlue = res.payload.data().price;
    });

    let lista = [];
    this.dataBase.obtenerTodos(environment.TABLAS.baterias).subscribe((docsModulosRef) => {
      if (docsModulosRef.length <= 0) return;
      lista = docsModulosRef.map((element: any) => {
        let auxElement = element.payload.doc.data();
        auxElement['id'] = element.payload.doc.id;
        return auxElement;
      });
      lista = this.ordenarListaPor(lista, 'modelo', 'precio');
      this.baterias = lista;
      this.bateriasAMostrar = [...this.baterias];
      // this.ajustarbateria();
    });


  }

  ajustarbateria() {
    this.baterias.forEach((bateria:any) => {
      bateria.detallesFinancieros =
      {
        costo: bateria.costo,
        margen: 4,
        colocacion: 8,
        precio: bateria.costo + 4 + 8,
      }
      delete bateria.costo;
      // this.dataBase.actualizar(environment.TABLAS.baterias,bateria,bateria.id);

      console.log(bateria)
    })
  }
  ordenarListaPor(lista: any[], criterio: string, criterio2: string) {
    return lista.sort((a, b) => a[criterio].localeCompare(b[criterio]) || a[criterio2] - b[criterio2]);
  }

  async seleccionar(bateria: any) {
    try {
      const modal = await this.modalController.create({
        component: DetalleBateriaComponent,
        componentProps: {
          repuesto: bateria,
          funcionesUtiles:this.funcionesUtiles,
          loggedUser:this.loggedUser,
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
    this.bateriasAMostrar = this.baterias.filter((d: any) =>
        d.modelo.toLowerCase().includes(query) || d.codigo?.toLowerCase().includes(query)
    );
}



  async abrirFormModulo() {
    try {
      const modal = await this.modalController.create({
        component: FormBateriaComponent,
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
