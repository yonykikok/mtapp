import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AlertService } from 'src/app/services/alert.service';
import { DataBaseService } from 'src/app/services/database.service';
import { InfoCompartidaService } from 'src/app/services/info-compartida.service';
import { ToastColor, ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-detalle-stock-modulo',
  templateUrl: './detalle-stock-modulo.component.html',
  styleUrls: ['./detalle-stock-modulo.component.scss'],
})
export class DetalleStockModuloComponent implements OnInit {


  panelOpenState = false;


  agregarColor = false;
  colores = this.infoConpatida.coloresModulos;
  cantidades = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  tipos = ['conMarco', 'sinMarco'];
  repuesto;

  cantidad = 1;
  color = this.infoConpatida.coloresModulos[0];
  tipo = ['conMarco', 'sinMarco'][0];

  constructor(
    private infoConpatida: InfoCompartidaService,
    private database: DataBaseService,
    private toastService: ToastService,
    private modalController: ModalController,
    private alertService: AlertService
  ) {
    // this.repuesto = data.repuesto;
    // console.log(this.repuesto)
  }

  ngOnInit(): void {
    this.repuesto['cantidadTotal'] = this.calcularCantidadTotalDeStock(this.repuesto);
  }
  calcularCantidadTotalDeStock(repuesto) {
    let cantidadConMarco = repuesto.stock.conMarco.reduce((cant, stockConMarco) => {
      return cant += Number(stockConMarco.cantidad);
    }, 0);

    let cantidadSinMarco = repuesto.stock.sinMarco.reduce((cant, stockConMarco) => {
      return cant += Number(stockConMarco.cantidad);
    }, 0);

    return cantidadConMarco + cantidadSinMarco;

  }


  cambiarCantidad(stock, accion, indice) {
    console.log(stock)
    if (accion == 'aumentar') {
      stock.cantidad = Number(stock.cantidad) + 1
    } else {
      if (stock.cantidad == 0) {
        this.repuesto.stock.splice(indice, 1);
        return;
      };
      stock.cantidad = Number(stock.cantidad) - 1;
    }
    // this.actualizarCantidadTotal();
  }


  actualizarCantidadTotal() {

    this.repuesto['cantidadTotal'] = this.repuesto.stock.conMarco.reduce((cantidad, stock) => {
      return cantidad += Number(stock.cantidad);
    }, 0);
    this.modalController.dismiss(this.repuesto, 'agregarStock')
    // this.dialogRef.close({ 'repuesto': this.repuesto, 'accion': 'actualizar' });

  }




  agregarNuevoColor() {

    let cantidad = this.cantidad;
    let color = this.color;
    let colorExistente;
    this.alertService.alertConfirmacion('Confirmación', `¿Quiere agregar <b>${cantidad}</b> del color <b>${color.toLowerCase()} ${this.tipo=='conMarco'?'con marco':'sin marco'}</b>`, 'Si', () => {

      colorExistente = this.repuesto.stock[this.tipo].find(stock => stock.color == color);


      if (!colorExistente) {
        cantidad <= 0
          ? this.toastService.simpleMessage('Atención', 'la cantidad debe ser mayor a 0', ToastColor.warning)
          : this.repuesto.stock[this.tipo].push({ cantidad, color });
      } else {
        colorExistente.cantidad = cantidad;
      }

      this.actualizarCantidadTotal();
      this.agregarColor = false;
    });
  }

  confirmarEliminacion() {
    this.alertService.alertConfirmacion('Confirmación', '¿Quiere remover este color de la lista?', 'Si, quitar', () => {
      this.modalController.dismiss(this.repuesto, 'eliminar')
    });
  }
}
