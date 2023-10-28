import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { User } from 'src/app/clases/user';
import { FormAcreedorComponent } from 'src/app/components/forms/form-acreedor/form-acreedor.component';
import { FormDeudorComponent } from 'src/app/components/forms/form-deudor/form-deudor.component';
import { AuthService } from 'src/app/services/auth.service';
import { DataBaseService } from 'src/app/services/database.service';
import { environment } from 'src/environments/environment';



@Component({
  selector: 'app-cuentas-clientes',
  templateUrl: './cuentas-clientes.page.html',
  styleUrls: ['./cuentas-clientes.page.scss'],
})
export class CuentasClientesPage implements OnInit {
  moduloSeleccionado = 'deudores';
  totalFiado = 0;
  totalAdeudado = 0;

  listaClientes: any = {
    acreedores: [],
    deudores: []
  }

  listaAMostrar: any[] = [];

  loggedUser!: User;
  textoABuscar: string = '';

  constructor(private database: DataBaseService,
    private authService: AuthService,
    // public dialog: MatDialog
    private modalController: ModalController
  ) {
    this.getCurrentUser();
  }

  ngOnInit(): void {
    //LISTA DEUDORES
    this.database.obtenerTodos(environment.TABLAS.deudores).subscribe(deudoresListRef => {
      this.listaClientes.deudores = deudoresListRef.map(deudorRef => {
        let deudor: any = deudorRef.payload.doc.data();
        deudor['id'] = deudorRef.payload.doc.id;
        return deudor;
      });
      this.listaAMostrar = [...this.listaClientes.deudores];
      this.ordenarLista(this.listaAMostrar);

      this.totalFiado = this.listaClientes.deudores.reduce((suma: number, deudor: any) => {
        return suma + (deudor.items.reduce((suma: number, item: any) => suma + item.precio, 0) - deudor.pagos.reduce((suma: number, pago: any) => suma + pago.monto, 0));
      }, 0);

    });


    //LISTA ACREEDORES
    this.database.obtenerTodos(environment.TABLAS.acreedores).subscribe(acreedoresListRef => {
      this.listaClientes.acreedores = acreedoresListRef.map(acreedorRef => {
        let acreedor: any = acreedorRef.payload.doc.data();
        acreedor['id'] = acreedorRef.payload.doc.id;
        return acreedor;
      });

      this.totalAdeudado = this.listaClientes.acreedores.reduce((suma: number, acreedor: any) => {
        if (!acreedor.saldado) {
          return suma + (acreedor.pagos.reduce((suma: number, pago: any) => suma + pago.monto, 0));
        } else {
          return suma;
        }
      }, 0);
    });
  }


  filtrarPorTexto(event: any) {
    let texto = event.target['value'];
    const query = !texto ? "" : texto.toLowerCase();
    this.listaAMostrar = this.listaClientes[this.moduloSeleccionado].filter((d: any) =>
      d.apellido.toString().toLowerCase().indexOf(query) > -1 ||
      d.direccion.toString().toLowerCase().indexOf(query) > -1 ||
      d.dni.toString().toLowerCase().indexOf(query) > -1 ||
      d.nombre.toString().toLowerCase().indexOf(query) > -1 ||
      d.telefono.toString().toLowerCase().indexOf(query) > -1
    );
    this.ordenarLista([...this.listaAMostrar]);

  }

  getCurrentUser() {
    this.authService.getCurrentUser().subscribe(userRef => {
      if (!userRef) return; //TODO:notificar
      this.database.obtenerPorId(environment.TABLAS.users, userRef.uid).subscribe((res) => {
        let usuario = res.payload.data() as User;
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

  async openDialog(moduloSeleccionado: any) {
    let componentes: any = {
      deudores: FormDeudorComponent,
      acreedores: FormAcreedorComponent
    }

    let component = componentes[moduloSeleccionado];

    try {
      const modal = await this.modalController.create({
        component,
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
    this.listaAMostrar = lista.sort((a: any, b: any) => {
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

  calcularRestante(deudor: any) {
    return this.calcularDeuda(deudor) - this.calcularPagos(deudor);
  }

  calcularDeuda(deudor: any) {
    if (!deudor.items) return;
    return Array.isArray(deudor.items) ? deudor.items.reduce((suma: number, item: any) => suma + item.precio, 0) : 0;
  }
  calcularPagos(deudor: any) {
    if (!deudor.pagos) return;
    return Array.isArray(deudor.items) ? deudor.pagos.reduce((suma: number, pago: any) => suma + pago.monto, 0) : 0;

  }

  seleccionarModulo(modulo: any) {
    this.moduloSeleccionado = modulo;
    this.listaAMostrar = this.listaClientes[modulo];
    this.ordenarLista(this.listaAMostrar);
  }
}
