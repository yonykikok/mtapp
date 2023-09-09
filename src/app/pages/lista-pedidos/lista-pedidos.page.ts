import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { User } from 'src/app/clases/user';
import { FormPedidoComponent } from 'src/app/components/forms/form-pedido/form-pedido.component';
import { DetallePedidoComponent } from 'src/app/components/views/detalle-pedido/detalle-pedido.component';
import { AlertService } from 'src/app/services/alert.service';
import { DataBaseService } from 'src/app/services/database.service';
import { ToastColor, ToastService } from 'src/app/services/toast.service';
import { environment } from 'src/environments/environment';
export interface PeriodicElement {
  tipo: string;
  modelo: string;
  cantidad: number;
}

var ELEMENT_DATA: PeriodicElement[] = [
];
@Component({
  selector: 'app-lista-pedidos',
  templateUrl: './lista-pedidos.page.html',
  styleUrls: ['./lista-pedidos.page.scss'],
})
export class ListaPedidosPage implements OnInit {
  listaSeleccionada = 'pendientes';
  pedidosAMostrar = [];
  pedidos = {
    conseguidos: [],
    notificados: [],
    pendientes: []
  };

  @Input() loggedUser: User;
  @Input() listaPedidos;
  textoABuscar;


  constructor(
    private database: DataBaseService,
    private alerService: AlertService,
    private toastService: ToastService,
    private modalController: ModalController
  ) { }
  ngOnInit(): void {
    // this.pedidosAMostrar = [...this.pedidos.pendientes];
    //   this.pedidosAMostrar?.sort(this.compare.bind(this))
    // return;
    let sus = this.database.obtenerTodos(environment.TABLAS.pedidos).subscribe(pedidosRef => {
      this.pedidos = {
        conseguidos: [],
        notificados: [],
        pendientes: []
      };
      pedidosRef.forEach(pedidoRef => {
        let pedido = pedidoRef.payload.doc.data();
        pedido['id'] = pedidoRef.payload.doc.id;
        //console.log(pedido)

        if (pedido['conseguido'] && !pedido['notificado']) {
          this.pedidos.conseguidos.push(pedido);
        } else if (pedido['conseguido'] && pedido['notificado']) {
          this.pedidos.notificados.push(pedido);
        } else {
          this.pedidos.pendientes.push(pedido);
        }
      });
      this.pedidosAMostrar = [...this.pedidos.pendientes];
      this.pedidosAMostrar?.sort(this.compare.bind(this));
      this.filtrarPorTexto(this.textoABuscar);

      // sus.unsubscribe();//remover despues de limpieza
    });
  }



  showSaveDialog(pedido, campo, message) {
    this.alerService.alertConfirmacion('Confirmación', message, 'Si, confirmo', this.guardar.bind(this, pedido, campo));
  }

  confirmarMarcado(pedido, campo, e) {
    let message = `¿  Ya has ${campo} el pedido?`;
    if (!pedido[campo]) {
      setTimeout(() => { pedido[campo] = false; }, 50);
    }

    e.stopPropagation();
    this.showSaveDialog(pedido, campo, message);
  }

  confirmarDesmarcado(pedido, campo, e) {
    let message = `¿Quieres desmarcar el pedido?`;
    if (pedido[campo]) {
      setTimeout(() => { pedido[campo] = true; }, 50);
    }

    e.stopPropagation();
    this.showSaveDialog(pedido, campo, message);
  }

  guardar(pedido, campo) {

    if (!pedido[campo]) {
      pedido[campo] = true;
    } else {
      pedido[campo] = false;
    }
    let auxPedido = { ...pedido };

    this.database.actualizar(environment.TABLAS.pedidos, auxPedido, pedido.id).finally(() => {
      let mensaje = auxPedido[campo] ?
        `Se marco como '${campo}', podras verlo en pedidos ${campo}s.` :
        "Se marco como 'pendiente', podras verlo en pedidos pendientes.";
      this.toastService.simpleMessage('', mensaje, ToastColor.success);
    });
  }

  obtenerNivelDePrioridad(prioridad) {
    switch (prioridad) {
      case "Opcional":
        return 0;
      case "Averiguar":
        return 1;
      case "Sin stock":
        return 2;
      case "Urgente":
        return 4;
      default:
        return 0;
    }
  }

  compare(a, b) {
    if (this.obtenerNivelDePrioridad(a.prioridad) < this.obtenerNivelDePrioridad(b.prioridad)) return 1;
    if (this.obtenerNivelDePrioridad(a.prioridad) > this.obtenerNivelDePrioridad(b.prioridad)) return -1;
    else {
      if (a.tipo > b.tipo) return 1;
      else if (a.tipo < b.tipo) return -1;
      return 0;
    }
  }
  async mostrarDetalle(pedido) {


    try {
      const modal = await this.modalController.create({
        component: DetallePedidoComponent,
        componentProps: {
          pedido: pedido
        },
      })

      modal.onDidDismiss().then((result: any) => {
        if (!result.data || !result.role) return;


        switch (result.role) {
          case 'cancelarPedido':

            this.database.eliminar(environment.TABLAS.pedidos, pedido.id).finally(() => {
              this.toastService.simpleMessage('', 'Se elimino el pedido, ya no aparecera en los listados', ToastColor.success);
              // this.actualizarLista();
            });
            break;
          case 'agregarNota':
            this.database.actualizar(environment.TABLAS.pedidos, pedido, pedido.id).finally(() => {
              this.toastService.simpleMessage('', 'Nota agregada', ToastColor.success);
            });
            break;
          case 'actualizarEstado':
            this.database.actualizar(environment.TABLAS.pedidos, pedido, pedido.id).then(res => {
              this.toastService.simpleMessage('', `Prioridad establecida como ${pedido.prioridad}`, ToastColor.success);
              // this.actualizarLista();
            });
            break;
        }

      })
      return await modal.present();
    } catch (err) {
    }



  }

  borarPedidosConseguidos() {
    let auxLista = this.pedidos.conseguidos.filter(ped => {
      if (ped.conseguido && !ped.nota) {
        return ped;
      }
    });
    auxLista.forEach(element => {
      this.database.eliminar(environment.TABLAS.pedidos, element.id).finally(() => {
      });
    });

  }
  filtrarPorTexto(texto) {
    const query = !texto ? "" : texto.toLowerCase();
    this.pedidosAMostrar = this.pedidos[this.listaSeleccionada].filter((d) => d.modelo.toLowerCase().indexOf(query) > -1 || d.tipo.toLowerCase().indexOf(query) > -1);
    this.pedidosAMostrar?.sort(this.compare.bind(this))

  }


  cargarListaDePedidos(estado: 'pendientes' | 'conseguidos' | 'notificados') {
    this.pedidosAMostrar = this.pedidos[estado];
    this.pedidosAMostrar?.sort(this.compare.bind(this))
    this.listaSeleccionada = estado;


  }

  cargarListaDePedidosParaNotificar() {
    this.pedidosAMostrar = this.pedidos.conseguidos.filter(pedido => pedido.cliente);
    this.pedidosAMostrar?.sort(this.compare.bind(this))
    this.listaSeleccionada = 'para_notificar';
    console.log(this.pedidosAMostrar);
  }

  async mostrarFormularioDeAltaPedido() {
    try {
      const modal = await this.modalController.create({
        component: FormPedidoComponent,
        componentProps: {
        },
      })

      modal.onDidDismiss().then((result: any) => {
        if (!result.data || !result.role) return;
      });
      return await modal.present();
    } catch (err) {
    }
  }


}


