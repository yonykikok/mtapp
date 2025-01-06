import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { User } from 'src/app/clases/user';
import { FormPedidoComponent } from 'src/app/components/forms/form-pedido/form-pedido.component';
import { DetallePedidoComponent } from 'src/app/components/views/detalle-pedido/detalle-pedido.component';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { DataBaseService } from 'src/app/services/database.service';
import { FuncionesUtilesService } from 'src/app/services/funciones-utiles.service';
import { Pedido, roles } from 'src/app/services/info-compartida.service';
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
  pedidosAMostrar: any = [];
  pedidos: any = {
    conseguidos: [],
    notificados: [],
    pendientes: []
  };

  @Input() loggedUser!: User;
  @Input() listaPedidos: Pedido[] = [];
  textoABuscar: string = '';


  isActionSheetOpen: boolean = false;
  actionSheetButtons: any[] = [{
    text: 'Borrar lista pedidos sin cliente',
    icon: 'trash-outline',
    handler: async () => {
      this.borarPedidosConseguidos();
    },
  }, {
    text: 'Cancelar',
    role: 'cancel',
    icon: 'close',
    handler: () => { },
  }];
  constructor(
    private database: DataBaseService,
    private alerService: AlertService,
    private toastService: ToastService,
    private modalController: ModalController,
    private actionSheetController: ActionSheetController,
    public funcionesUtiles: FuncionesUtilesService,
    private authService: AuthService
  ) { }
  ngOnInit(): void {
    this.getCurrentUser();

    let sus = this.database.obtenerTodos(environment.TABLAS.pedidos).subscribe((pedidosRef: any) => {
      this.pedidos = {
        conseguidos: [],
        notificados: [],
        pendientes: []
      };
      pedidosRef.forEach((pedidoRef: any) => {
        let pedido: any = pedidoRef.payload.doc.data();
        pedido['id'] = pedidoRef.payload.doc.id;

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
      this.filtrarPorTexto(this.textoABuscar, false);

      // sus.unsubscribe();//remover despues de limpieza
    });
  }

  setOpen(isOpen: boolean) {
    this.isActionSheetOpen = isOpen;
  }
  mostrarOpciones() {
    if (this.funcionesUtiles.roleMinimoNecesario(roles.OWNER, this.loggedUser)) {
      this.setOpen(true);
    }
  }

  getCurrentUser() {
    this.authService.getCurrentUser().subscribe((userRef: any) => {
      this.database.obtenerPorId(environment.TABLAS.users, userRef.uid).subscribe((res: any) => {
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


  showSaveDialog(pedido: Pedido, campo: string, message: string) {
    this.alerService.alertConfirmacion('Confirmación', message, 'Si, confirmo', this.guardar.bind(this, pedido, campo));
  }

  confirmarMarcado(pedido: Pedido, campo: string, e: any) {
    let message = `¿  Ya has ${campo} el pedido?`;
    if (!pedido[campo]) {
      setTimeout(() => { pedido[campo] = false; }, 50);
    }

    e.stopPropagation();
    this.showSaveDialog(pedido, campo, message);
  }

  confirmarDesmarcado(pedido: Pedido, campo: string, e: any) {
    let message = `¿Quieres desmarcar el pedido?`;
    if (pedido[campo]) {
      setTimeout(() => { pedido[campo] = true; }, 50);
    }

    e.stopPropagation();
    this.showSaveDialog(pedido, campo, message);
  }

  guardar(pedido: Pedido, campo: string) {

    if (!pedido[campo]) {
      pedido[campo] = true;
    } else {
      pedido[campo] = false;
    }
    let auxPedido = { ...pedido };

    this.database.actualizar(environment.TABLAS.pedidos, auxPedido, pedido.id)?.finally(() => {
      let mensaje = auxPedido[campo] ?
        `Se marco como '${campo}', podras verlo en pedidos ${campo}s.` :
        "Se marco como 'pendiente', podras verlo en pedidos pendientes.";
      this.toastService.simpleMessage('', mensaje, ToastColor.success);
    });
  }

  obtenerNivelDePrioridad(prioridad: string) {
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

  compare(a: Pedido, b: Pedido) {
    if (this.obtenerNivelDePrioridad(a.prioridad) < this.obtenerNivelDePrioridad(b.prioridad)) return 1;
    if (this.obtenerNivelDePrioridad(a.prioridad) > this.obtenerNivelDePrioridad(b.prioridad)) return -1;
    else {
      if (a.tipo > b.tipo) return 1;
      else if (a.tipo < b.tipo) return -1;
      return 0;
    }
  }
  async mostrarDetalle(pedido: Pedido) {


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
            this.database.actualizar(environment.TABLAS.pedidos, pedido, pedido.id)?.finally(() => {
              this.toastService.simpleMessage('', 'Nota agregada', ToastColor.success);
            });
            break;
          case 'actualizarEstado':
            this.database.actualizar(environment.TABLAS.pedidos, pedido, pedido.id)?.then((res: any) => {
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
    let auxLista = this.pedidos.conseguidos.filter((ped: Pedido) => {
      if (ped.conseguido) {
        return ped;
      }
      return;
    });
    auxLista.forEach((element: Pedido) => {
      this.database.eliminar(environment.TABLAS.pedidos, element.id).finally(() => {
      });
    });

  }

  borarPedidosConseguidosSinClientes() {
    let auxLista = this.pedidos.conseguidos.filter((ped: Pedido) => {
      if (ped.conseguido && !ped.cliente) {
        return ped;
      }
      return;
    });
    auxLista.forEach((element: Pedido) => {
      this.database.eliminar(environment.TABLAS.pedidos, element.id).finally(() => {
      });
    });

  }
  filtrarPorTexto(event: any, esPorEvent: boolean) {
    if (!event) return;

    let texto = '';
    if (esPorEvent) {
      texto = event.target['value'];
    } else {
      texto = event;
    }
    const query = !texto ? "" : texto.toLowerCase();
    this.pedidosAMostrar = this.pedidos[this.listaSeleccionada].filter((ped: Pedido) => ped.modelo.toLowerCase().indexOf(query) > -1 || ped.tipo?.toLowerCase().indexOf(query) > -1|| ped.categoria?.toLowerCase().indexOf(query) > -1);
    this.pedidosAMostrar?.sort(this.compare.bind(this))

  }


  cargarListaDePedidos(estado: 'pendientes' | 'conseguidos' | 'notificados') {
    this.pedidosAMostrar = this.pedidos[estado];
    this.pedidosAMostrar?.sort(this.compare.bind(this))
    this.listaSeleccionada = estado;


  }

  cargarListaDePedidosParaNotificar() {
    this.pedidosAMostrar = this.pedidos.conseguidos.filter((pedido: Pedido) => pedido.cliente);
    this.pedidosAMostrar?.sort(this.compare.bind(this))
    this.listaSeleccionada = 'para_notificar';
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

  notificarPorWhatsapp(e: any, pedido: any) {
    e.stopPropagation();
    this.presentActionSheet(pedido)
  }


  abrirWhatsApp(pedido: any, mensaje: string) {
    const url = `https://api.whatsapp.com/send?phone=+54${pedido.telefono}&text=${encodeURIComponent(mensaje)}`;

    window.open(url, '_system');
  }

  async presentActionSheet(pedido: Pedido) {

    let boletaMessage = pedido.cliente.boleta
      ? `Recorda que tu numero de boleta es ${pedido.cliente.boleta}.`
      : '';
    let mensaje = `Hola ${pedido.cliente.nombre} como estas? te escribia por el pedido de ${pedido.tipo} que habias realizado. Era para informarte que ya lo conseguimos, por favor indicanos si aun estas interesado en el pedido. ${boletaMessage}`;
    // Mensaje predeterminado para el cliente;
    const actionSheet = await this.actionSheetController.create({
      mode: 'ios',
      header: 'Elija una opción',
      buttons: [
        {
          text: 'Enviar mensaje',
          handler: () => {
            this.abrirWhatsApp(pedido, mensaje)
          }
        }, {
          text: 'Enviar mensaje con precio',
          handler: () => {
            let precioMensaje = " Tambien aprovecho y te adjunto el precio final que es de XXXX";
            this.abrirWhatsApp(pedido, mensaje + precioMensaje)
          }
        },
        {
          text: 'Cancelar',
          role: 'cancel',
        }
      ]
    });

    await actionSheet.present();
  }

  async mostrarNota(event:Event,pedido: Pedido) {
    event.stopPropagation();
    this.alerService.alertSinAccion('NOTA', pedido.nota, 'OK');
  }
}


