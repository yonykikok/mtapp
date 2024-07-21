import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';
import { FuncionesUtilesService } from 'src/app/services/funciones-utiles.service';
import { SpinnerService } from 'src/app/services/spinner.service';

@Component({
  selector: 'app-modificador-de-stock-rapido',
  templateUrl: './modificador-de-stock-rapido.component.html',
  styleUrls: ['./modificador-de-stock-rapido.component.scss'],
})
export class ModificadorDeStockRapidoComponent implements OnInit {

  stock: number = 0;
  @Input()  stockEditable: number = 0;
  @Output() actualizarStockEvent = new EventEmitter<number>();
  @Output() cerrarModificadorEvent = new EventEmitter<null>();
  constructor(private funcionesUtiles: FuncionesUtilesService,
    private alertService: AlertService,
  ) { }

  cerrarModificador() {
    this.cerrarModificadorEvent.emit();
  }

  ngOnInit() {
  }



  seleccionarStock(e: Event, item: any) {
    e.stopPropagation();
    this.stock = item;
    this.stockEditable = this.funcionesUtiles.clonarObjeto(item);
    if (!this.stockEditable) {
      this.stockEditable = 0;
    }
  }
  cambiarCantidad(accion: string) {


    if (accion == 'aumentar') {
      this.stockEditable = Number(this.stockEditable) + 1
    } else {
      if (this.stockEditable == 0) {
        return;
      };
      this.stockEditable = Number(this.stockEditable) - 1;
    }
    // this.actualizarCantidadTotal();
  }




  guardarCambios() {
    this.alertService.alertConfirmacion('Confirmación', "¿Quiere modificar el stock actual?", 'Si, modificar', () => {
      this.stock = this.stockEditable;
      this.actualizarStockEvent.emit(this.stock);
    });
  }
}
