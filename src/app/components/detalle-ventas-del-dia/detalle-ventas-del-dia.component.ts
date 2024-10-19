import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { LibroDiario } from 'src/app/clases/libro-diario';
import { FormDetalleVentaComponent, MediosDePago } from '../forms/form-detalle-venta/form-detalle-venta.component';
import { environment } from 'src/environments/environment';
import { DataBaseService } from 'src/app/services/database.service';
import { ToastColor, ToastService } from 'src/app/services/toast.service';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-detalle-ventas-del-dia',
  templateUrl: './detalle-ventas-del-dia.component.html',
  styleUrls: ['./detalle-ventas-del-dia.component.scss'],
})
export class DetalleVentasDelDiaComponent implements OnInit {
  montoIngresado = 0;
  libroDiario!: LibroDiario;
  isActionSheetOpen = false;
  actionSheetButtons: any[] = [{
    text: 'Recalcular monto total',
    icon: 'calculator-outline',
    handler: async () => {

      this.libroDiario.montoTotalEfectivo = this.obtenerMontoTotalPorMedioDePago(this.libroDiario, MediosDePago.Efectivo);//total en efectivo
      this.libroDiario.montoTotalTransferencia = this.obtenerMontoTotalPorMedioDePago(this.libroDiario, MediosDePago.Transferencia);//total en efectivo
      this.libroDiario.montoTotalMercadoPago = this.obtenerMontoTotalPorMedioDePago(this.libroDiario, MediosDePago.MercadoPago);//total en efectivo
      this.libroDiario.montoTotalNegativo = this.obtenerMontoTotalPorNegativo(this.libroDiario);//total negativo

      console.log(this.libroDiario)
      this.database.actualizar(environment.TABLAS.ingresos, this.libroDiario, this.libroDiario.id);

    }
  }, {
    text: 'Cancelar',
    role: 'cancel',
    icon: 'close',
    handler: () => { },
  }];
  constructor(private modalController: ModalController,
    private database: DataBaseService,
    private toastService: ToastService,
    private alertService: AlertService) { }

  obtenerMontoTotalPorMedioDePago(libroDiarioHoy: any, medioDePago: MediosDePago) {
    let acumulador = 0;
    libroDiarioHoy.ventas.forEach((venta: any) => {
      if (venta.medioDePago == medioDePago) {
        acumulador += venta.precio;
      }
    });
    return acumulador;
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
  ngOnInit(): void {
  }
  async cargarMontoInicial() {
    this.libroDiario.montoInicial = Number(this.montoIngresado);
    await this.database.actualizar(environment.TABLAS.ingresos, this.libroDiario, this.libroDiario.id);
  }

  showConfirmDialog() {
    this.alertService.alertConfirmacion('Confirmación', `La caja inicial es: $${this.montoIngresado}?`, 'Si, confirmo', this.cargarMontoInicial.bind(this));
  }
  async abrirFormularioDeVenta() {
    let modal = await this.modalController.create({
      component: FormDetalleVentaComponent,
    });
    modal.onDidDismiss().then(result => {

      if (result.role == "guardarItems") {
        this.libroDiario.ventas = [...this.libroDiario.ventas, ...result.data];

        this.database.actualizar(environment.TABLAS.ingresos, this.libroDiario, this.libroDiario.id)?.then(res => {

          this.toastService.simpleMessage('Exito', 'Se agregaron las ventas al dia seleccionado', ToastColor.success);
        });
      }
    });
    modal.present();
  }

  mostrarOpciones() {
    console.log("EMNTRA")
    this.setOpen(true);
  }
  setOpen(isOpen: boolean) {
    this.isActionSheetOpen = isOpen;
  }

}
