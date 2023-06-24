import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormDeudorComponent } from 'src/app/components/forms/form-deudor/form-deudor.component';
import { AuthService } from 'src/app/services/auth.service';
import { DataBaseService } from 'src/app/services/database.service';
import { environment } from 'src/environments/environment';



@Component({
  selector: 'app-deudores',
  templateUrl: './deudores.page.html',
  styleUrls: ['./deudores.page.scss'],
})
export class DeudoresPage implements OnInit {
  totalFiado = 0;
  listaDudores;
  listaDeudoresAMostrar;
  loggedUser;
  textoABuscar;

  constructor(private database: DataBaseService,
    private authService: AuthService,
    // public dialog: MatDialog
    private modalController: ModalController
  ) {
    this.getCurrentUser();
  }

  ngOnInit(): void {
    this.database.obtenerTodos(environment.TABLAS.deudores).subscribe(deudoresListRef => {
      this.listaDudores = deudoresListRef.map(deudorRef => {
        let deudor = deudorRef.payload.doc.data();
        deudor['id'] = deudorRef.payload.doc.id;
        return deudor;
      });
      this.listaDeudoresAMostrar = [...this.listaDudores];
      this.ordenarLista(this.listaDeudoresAMostrar);

      this.totalFiado = this.listaDudores.reduce((suma, deudor) => {
        return suma + (deudor.items.reduce((suma, item) => suma + item.precio, 0) - deudor.pagos.reduce((suma, pago) => suma + pago.monto, 0));
      }, 0);

    });
  }


  filtrarPorTexto(texto) {
    const query = !texto ? "" : texto.toLowerCase();
    this.listaDeudoresAMostrar = this.listaDudores.filter((d) =>
      d.apellido.toLowerCase().indexOf(query) > -1 ||
      d.direccion.toLowerCase().indexOf(query) > -1 ||
      d.dni.toLowerCase().indexOf(query) > -1 ||
      d.nombre.toLowerCase().indexOf(query) > -1 ||
      d.telefono.toLowerCase().indexOf(query) > -1
    );
    this.ordenarLista([...this.listaDeudoresAMostrar]);

  }

  getCurrentUser() {
    this.authService.getCurrentUser().subscribe(userRef => {
      this.database.obtenerPorId(environment.TABLAS.users, userRef.uid).subscribe((res) => {
        let usuario = res.payload.data();
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

  async openDialog() {

    try {
      const modal = await this.modalController.create({
        component: FormDeudorComponent,
        componentProps: {
        },
      })

      modal.onDidDismiss().then((result: any) => {
        if (!result.data || !result.role) return;

        if (result.role == 'guardarCambios') {

        }

      })
      return await modal.present();
    } catch (err) {
    }
    // const dialogRef = this.dialog.open(FormAltaDeudorComponent, {
    //   width: '100vw',
    //   panelClass: 'minWidth360px'
    // });

    // dialogRef.afterClosed().subscribe(result => {
    //   // this.animal = result;
    // });
  }


  ordenarLista(lista: any[]) {
    this.listaDeudoresAMostrar = lista.sort((a: any, b: any) => {
      console.log(this.calcularDeuda(a))
      if (this.calcularRestante(a) > this.calcularRestante(b)) {
        return -1;
      }
      else if (this.calcularRestante(a) == this.calcularRestante(b)) {
        return 1;
      }
      else {
        return 0;
      }
    })
  }

  calcularRestante(deudor) {
    return this.calcularDeuda(deudor) - this.calcularPagos(deudor);
  }

  calcularDeuda(deudor) {
    if (!deudor.items) return;
    return Array.isArray(deudor.items) ? deudor.items.reduce((suma, item) => suma + item.precio, 0) : 0;
  }
  calcularPagos(deudor) {
    if (!deudor.pagos) return;
    return Array.isArray(deudor.items) ? deudor.pagos.reduce((suma, pago) => suma + pago.monto, 0) : 0;

  }
}
