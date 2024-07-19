import { Component, OnInit } from '@angular/core';
import { Producto } from '../nueva-funcionalidad/nueva-funcionalidad.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'src/app/services/alert.service';
import { FuncionesUtilesService } from 'src/app/services/funciones-utiles.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-cambiar-stock-producto',
  templateUrl: './cambiar-stock-producto.component.html',
  styleUrls: ['./cambiar-stock-producto.component.scss'],
})
export class CambiarStockProductoComponent implements OnInit {
  producto!: Producto;
  agregarNuevoColor: boolean = false;
  stockForm = new FormGroup({
    color: new FormControl('#000000', [Validators.required]),
    stock: new FormControl(1, [Validators.required]),
    denominacionColor: new FormControl('Negro', [Validators.required])
  });
  productoOriginal!: Producto;
  constructor(private alertService: AlertService,
    private funcionesUtilesService: FuncionesUtilesService,
    private modalController: ModalController
  ) { }

  ngOnInit() {
    this.productoOriginal = this.funcionesUtilesService.clonarObjeto(this.producto)
  }

  agregarColor() {
    if (!this.producto.coloresDisponibles) { return; }
    let nuevoColor: any = this.stockForm.value;
    // Verificar si el color ya existe en el array
    const existe = this.producto.coloresDisponibles.some(color => (color.color === nuevoColor.color || color.denominacionColor.toLowerCase() === nuevoColor.denominacionColor.toLowerCase()));

    // Si el color no existe, agregarlo al array
    if (!existe) {
      this.producto.coloresDisponibles.push(nuevoColor);
      console.log(`El color ${nuevoColor.denominacionColor} ha sido agregado.`);
    } else {
      console.log(`El color ${nuevoColor.denominacionColor} ya existe en la lista.`);
    }
  }

  aumentarStock(colorSeleccionado: { stock: number; color: string; denominacionColor: string; }) {
    colorSeleccionado.stock = colorSeleccionado.stock + 1;
  }
  disminuirStock(colorSeleccionado: { stock: number; color: string; denominacionColor: string; }) {
    if (colorSeleccionado.stock > 0) {
      colorSeleccionado.stock = colorSeleccionado.stock - 1;
    } else {
      this.alertService.alertConfirmacion('Confirmacion', 'ya no puedes descontar stock, ¿quieres eliminarlo de los colores disponbiles?', 'Si', () => {
        let indexABorrar = this.producto.coloresDisponibles?.findIndex(color => color.denominacionColor == colorSeleccionado.denominacionColor);
        if ((indexABorrar || indexABorrar == 0) && indexABorrar != -1) {
          console.log(indexABorrar)
          this.producto.coloresDisponibles?.splice(indexABorrar, 1);
        }
      })
    }
  }
  guardarProducto() {
    
    this.producto.cantidad = this.producto.coloresDisponibles?.reduce((total: number, color: any) => {
      return total + color.stock;
    }, 0) || 0
    
    this.modalController.dismiss(this.producto, 'Guardar');

  }

  verSiHayCambios() {
    if (JSON.stringify(this.producto) != JSON.stringify(this.productoOriginal)) {
      return true;
    }
    return false;
  }

  volverAtras() {
    this.producto = this.funcionesUtilesService.clonarObjeto(this.productoOriginal);
  }
}
