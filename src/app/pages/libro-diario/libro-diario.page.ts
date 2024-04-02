import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { LibroDiario } from 'src/app/clases/libro-diario';
import { User } from 'src/app/clases/user';
import { AperturaDeCajaComponent } from 'src/app/components/apertura-de-caja/apertura-de-caja.component';
import { FormActualizarItemLibroDiarioComponent } from 'src/app/components/forms/form-actualizar-item-libro-diario/form-actualizar-item-libro-diario.component';
import { FormDetalleVentaComponent, MediosDePago } from 'src/app/components/forms/form-detalle-venta/form-detalle-venta.component';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { DataBaseService } from 'src/app/services/database.service';
import { FuncionesUtilesService } from 'src/app/services/funciones-utiles.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import { ToastColor, ToastService } from 'src/app/services/toast.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-libro-diario',
  templateUrl: './libro-diario.page.html',
  styleUrls: ['./libro-diario.page.scss'],
})
export class LibroDiarioPage implements OnInit {
  isActionSheetOpen = false;
  actionSheetButtons: any = [];

  montoInicialOriginal: number = 0;
  mostrarModalCierreDeCaja = false;
  resultadoDeCaja: number = 0;
  montoDeCaja = null;
  libroDiarioHoy: LibroDiario = {
    id: '',
    fecha: -1,
    ventas: [],
    montoInicial: 0,
    montoTotal: 0,
    cuadra: false,
    fechaString: '',
    montoTotalEfectivo: 0,
    montoTotalMercadoPago: 0,
    montoTotalTransferencia: 0,
    montoTotalNegativo: 0
  }
  mostrarMontoInicial = true;
  montoIngresado: number = 0;
  loggedUser!: User;

  constructor(private authService: AuthService,
    private database: DataBaseService,
    public funcionesUtiles: FuncionesUtilesService,
    private modalController: ModalController,
    private spinnerService: SpinnerService,
    private toastService: ToastService,
    private alertService: AlertService,
  ) {
    this.getCurrentUser();

  }

  ngOnInit(): void {
    const fechaActual = new Date();
    const anio = fechaActual.getFullYear();
    const mes = (fechaActual.getMonth() + 1).toString().padStart(2, '0'); // Sumar 1 ya que los meses se indexan desde 0
    const dia = fechaActual.getDate().toString().padStart(2, '0');

    const idDiaActual = `${anio}-${mes}-${dia}`;
    console.log(idDiaActual);

    this.database.obtenerPorId(environment.TABLAS.ingresos, idDiaActual).subscribe(res => {
      if (!res.payload.exists) {
        this.libroDiarioHoy = this.obtenerNuevoLibroDiario(idDiaActual);//aca debe estar el problema
        this.database.crearConCustomId(environment.TABLAS.ingresos, this.libroDiarioHoy.id, this.libroDiarioHoy);
      } else {
        this.libroDiarioHoy = res.payload.data() as LibroDiario;
        this.libroDiarioHoy['id'] = res.payload.id;
      }

    });
  }


  async mostrarModalAbrirCaja() {
    try {
      const modal = await this.modalController.create({
        component: AperturaDeCajaComponent,
        componentProps: {
          isModal: false,
          libroDiarioHoy: this.libroDiarioHoy
        },
      })

      modal.onDidDismiss().then(async (result: any) => {
        if (!result.data == undefined || !result.role) return;


        console.log("Guardando")
        if (result.role == 'guardar') {
          this.spinnerService.showLoading("Cargando monto...");
          this.libroDiarioHoy.montoInicial = Number(result.data);
          await this.database.actualizar(environment.TABLAS.ingresos, this.libroDiarioHoy, this.libroDiarioHoy.id)?.then(res => {
            this.spinnerService.stopLoading();
          });
        }

      })
      return await modal.present();
    } catch (err) {
    }
  }
  cargarActionSheet() {
    this.actionSheetButtons = [];

    if (this.funcionesUtiles.roleMinimoNecesario('EMPLEADO', this.loggedUser)) {
      this.actionSheetButtons.unshift({
        text: (this.libroDiarioHoy.montoInicial && this.libroDiarioHoy.montoInicial > 0)
          ? 'Cambiar monto inicial' : 'Iniciar Caja',
        icon: 'calculator-outline',
        handler: () => {
          this.mostrarModalAbrirCaja();
        },
      });
    }
    this.actionSheetButtons.push({
      text: 'Cancelar',
      role: 'cancel',
      icon: 'close',
      handler: () => { },
    })
  }
  setOpen(isOpen: boolean) {
    this.isActionSheetOpen = isOpen;
  }
  async cargarMontoInicial() {
    this.libroDiarioHoy.montoInicial = Number(this.montoIngresado);
    await this.database.actualizar(environment.TABLAS.ingresos, this.libroDiarioHoy, this.libroDiarioHoy.id);
    this.cargarActionSheet();
  }

  obtenerNuevoLibroDiario(id: string) {
    let hoy = new Date();
    hoy.setHours(0);
    hoy.setMinutes(0);
    hoy.setSeconds(0);

    let libroDiario: LibroDiario = {
      id,
      fecha: hoy.getTime(),
      fechaString: hoy.toString(),
      ventas: [],
      montoInicial: Number(this.montoIngresado) | 0,
      montoTotal: Number(this.montoIngresado) | 0,
      cuadra: false
    }
    this.montoIngresado = 0;//ver si resuelve la apertura de caja erronea, sino eliminar.
    return libroDiario;
  }

  showConfirmDialog() {
    this.alertService.alertConfirmacion('Confirmación', `La caja inicial es: $${this.montoIngresado}?`, 'Si, confirmo', this.cargarMontoInicial.bind(this));
  }

  getCurrentUser() {
    this.authService.getCurrentUser().subscribe(userRef => {
      if (!userRef) return;

      this.database.obtenerPorId(environment.TABLAS.users, userRef.uid).subscribe((res) => {
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

        this.cargarActionSheet();
      })
    })
  }
  async openDialog() {

    try {
      const modal = await this.modalController.create({
        component: FormDetalleVentaComponent,
        componentProps: {
          isModal: false
        },
      })

      modal.onDidDismiss().then((result: any) => {
        if (!result.data || !result.role) return;


        if (result.role == 'guardarItems') {

          if (!this.libroDiarioHoy.montoTotalEfectivo) {
            this.libroDiarioHoy.montoTotalEfectivo = Number(this.libroDiarioHoy.montoInicial);
          }

          this.libroDiarioHoy.ventas = this.libroDiarioHoy.ventas || [];
          this.libroDiarioHoy.ventas = [...this.libroDiarioHoy.ventas, ...result.data];
          this.libroDiarioHoy.montoTotalEfectivo = this.obtenerMontoTotalPorMedioDePago(this.libroDiarioHoy, MediosDePago.Efectivo);//total en efectivo
          this.libroDiarioHoy.montoTotalTransferencia = this.obtenerMontoTotalPorMedioDePago(this.libroDiarioHoy, MediosDePago.Transferencia);//total en efectivo
          this.libroDiarioHoy.montoTotalMercadoPago = this.obtenerMontoTotalPorMedioDePago(this.libroDiarioHoy, MediosDePago.MercadoPago);//total en efectivo
          this.libroDiarioHoy.montoTotalNegativo = this.obtenerMontoTotalPorNegativo(this.libroDiarioHoy);//total negativo

          this.database.actualizar(environment.TABLAS.ingresos, this.libroDiarioHoy, this.libroDiarioHoy.id);
        }

      })
      return await modal.present();
    } catch (err) {
    }
  }

  obtenerMontoTotalPorMedioDePago(libroDiarioHoy: any, medioDePago: MediosDePago) {
    let acumulador = 0;
    libroDiarioHoy.ventas.forEach((venta: any) => {
      if (venta.medioDePago == medioDePago) {
        acumulador += venta.precio;
      }
    });
    return acumulador;
  }

  comprobar() {
    if (this.libroDiarioHoy.montoTotalEfectivo && this.libroDiarioHoy.montoInicial && this.montoDeCaja) {

      this.resultadoDeCaja = (this.libroDiarioHoy.montoTotalEfectivo + this.libroDiarioHoy.montoInicial) - this.montoDeCaja;

      let mensaje = '';
      if (this.resultadoDeCaja > 0) {//(falta plata en la caja)
        mensaje = 'falta plata en la caja';
      }
      else if (this.resultadoDeCaja < 0) {//(hay de mas en la caja)
        mensaje = 'hay de mas en la caja';
      } else {//Cerro perfecto!
        mensaje = 'Cerro perfecto!';
      }

      if (!this.libroDiarioHoy.historialDeCierre) {
        this.libroDiarioHoy.historialDeCierre = [];
      }

      this.libroDiarioHoy.historialDeCierre.push({
        fecha: Date.now(),
        fechaString: new Date().toLocaleString(),
        mensaje,
        usuario: this.loggedUser.displayName || '',
        resultadoDeCaja: this.montoDeCaja - (this.libroDiarioHoy.montoTotalEfectivo + this.libroDiarioHoy.montoInicial),
      });

      this.database.actualizar(environment.TABLAS.ingresos, this.libroDiarioHoy, this.libroDiarioHoy.id);
    }

  }
  detenerPropagacion(e: any) {
    e.stopPropagation();
  }
  reiniciarMontoInicialDeCaja() {
    this.libroDiarioHoy.montoInicial = 0;
  }
  obtenerMontoTotalPorNegativo(libroDiarioHoy: any) {
    let acumuladorNegativo = 0;
    libroDiarioHoy.ventas.forEach((venta: any) => {
      if (venta.precio < 0) {
        acumuladorNegativo += venta.precio;
      }
    });
    return acumuladorNegativo;
  }

  async mostrarModalEditarVenta(venta: any) {
    try {
      const modal = await this.modalController.create({
        component: FormActualizarItemLibroDiarioComponent,
        componentProps: {
          item: venta
        },
      })

      modal.onDidDismiss().then((result: any) => {
        if (!result.role) return;
        let necesitaActualizar = false;


        if (result.role == 'confirmarActualizacion') {
          necesitaActualizar = true;

        } else if (result.role == 'eliminarItemVenta') {
          let indexAEliminar: number = this.libroDiarioHoy.ventas.findIndex(auxVenta => auxVenta == venta);
          //console.log(indexAEliminar)
          if (indexAEliminar != -1) {
            this.libroDiarioHoy.ventas.splice(indexAEliminar, 1);
            necesitaActualizar = true;
          }

        }


        if (necesitaActualizar) {
          this.libroDiarioHoy.montoTotalEfectivo = this.obtenerMontoTotalPorMedioDePago(this.libroDiarioHoy, MediosDePago.Efectivo);//total en efectivo
          this.libroDiarioHoy.montoTotalTransferencia = this.obtenerMontoTotalPorMedioDePago(this.libroDiarioHoy, MediosDePago.Transferencia);//total en efectivo
          this.libroDiarioHoy.montoTotalMercadoPago = this.obtenerMontoTotalPorMedioDePago(this.libroDiarioHoy, MediosDePago.MercadoPago);//total en efectivo
          this.libroDiarioHoy.montoTotalNegativo = this.obtenerMontoTotalPorNegativo(this.libroDiarioHoy);//total negativo

          this.database.actualizar(environment.TABLAS.ingresos, this.libroDiarioHoy, this.libroDiarioHoy.id)?.then(res => {
            this.toastService.simpleMessage('Exito', 'Se modifico la venta', ToastColor.success);
          });
        }

      })
      return await modal.present();
    } catch (err) {
    }

  }


  mostrarOpciones() {
    this.setOpen(true);
  }
}
