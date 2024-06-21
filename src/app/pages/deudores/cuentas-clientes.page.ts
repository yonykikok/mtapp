import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { User } from 'src/app/clases/user';
import { FormAcreedorComponent } from 'src/app/components/forms/form-acreedor/form-acreedor.component';
import { FormDeudorComponent } from 'src/app/components/forms/form-deudor/form-deudor.component';
import { AuthService } from 'src/app/services/auth.service';
import { DataBaseService } from 'src/app/services/database.service';
import { environment } from 'src/environments/environment';

interface FechaLimite {
  seconds: number,
  nanoseconds: number
}
interface Item {
  precio: number,
  producto: string,
  fecha: number
}
interface Pago {
  monto: number,
  concepto: string,
  fecha: number
}
export interface Deudor {
  telefono: string,
  apellido: string,
  fechaLimite: FechaLimite,
  deudaTotal: number,
  dni: string,
  direccion: string,
  nombre: string,
  id: string,
  fechaCreacion: number,
  items: Item[],
  montoTotal: 960,
  pagos: Pago[]
}
export interface Acreedor {
  telefono: number,
  apellido: string,
  fechaCreacion: number,
  id: string,
  nombre: string,
  pagos: Pago[],
  saldado: boolean,
  items: [
    {
      fecha: number,
      producto: string
    }
  ],
  direccion: string,
  dni: number
}


@Component({
  selector: 'app-cuentas-clientes',
  templateUrl: './cuentas-clientes.page.html',
  styleUrls: ['./cuentas-clientes.page.scss'],
})
export class CuentasClientesPage implements OnInit {
  moduloSeleccionado: 'acreedores' | 'deudores' = 'deudores';
  totalFiado = 0;
  totalAdeudado = 0;

  listaClientes: {
    acreedores: Acreedor[];
    deudores: Deudor[];
  } = {
      acreedores: [],
      deudores: []
    };

  listaAMostrar: (Acreedor | Deudor)[] = [];

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
        let deudor: Deudor = deudorRef.payload.doc.data() as Deudor;
        deudor['id'] = deudorRef.payload.doc.id;
        return deudor;
      });
      this.listaAMostrar = [...this.listaClientes.deudores];
      this.ordenarLista(this.listaAMostrar);
      console.log(this.listaAMostrar)

      this.totalFiado = this.listaClientes.deudores.reduce((suma: number, deudor: any) => {
        return suma + (deudor.items.reduce((suma: number, item: any) => suma + item.precio, 0) - deudor.pagos.reduce((suma: number, pago: any) => suma + pago.monto, 0));
      }, 0);

    });


    //LISTA ACREEDORES
    this.database.obtenerTodos(environment.TABLAS.acreedores).subscribe(acreedoresListRef => {
      this.listaClientes.acreedores = acreedoresListRef.map(acreedorRef => {
        let acreedor: Acreedor = acreedorRef.payload.doc.data() as Acreedor;
        acreedor['id'] = acreedorRef.payload.doc.id;
        return acreedor;
      });

      console.log(this.listaClientes.acreedores)
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
    console.log(typeof this.listaClientes[this.moduloSeleccionado]);
    console.log(this.listaClientes[this.moduloSeleccionado]);
    //@ts-ignore
    this.listaAMostrar = this.listaClientes[this.moduloSeleccionado]?.filter((d: Acreedor | Deudor) =>
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

  calcularRestante(deudor: Deudor) {
    return this.calcularDeuda(deudor) - this.calcularPagos(deudor);
  }

  calcularDeuda(deudor: Deudor) {
    if (!deudor.items) return 0;
    return Array.isArray(deudor.items) ? deudor.items.reduce((suma: number, item: any) => suma + item.precio, 0) : 0;
  }
  calcularPagos(deudor: Deudor) {
    if (!deudor.pagos) return 0;
    return Array.isArray(deudor.items) ? deudor.pagos.reduce((suma: number, pago: any) => suma + pago.monto, 0) : 0;

  }

  seleccionarModulo(modulo: 'acreedores' | 'deudores') {
    this.moduloSeleccionado = modulo;
    this.listaAMostrar = this.listaClientes[modulo];
    this.ordenarLista(this.listaAMostrar);
  }
}
