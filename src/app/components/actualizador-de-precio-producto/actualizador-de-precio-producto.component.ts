import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { User } from 'src/app/clases/user';
import { Producto } from 'src/app/pages/lista-productos/lista-productos.page';
import { AlertService } from 'src/app/services/alert.service';
import { DataBaseService } from 'src/app/services/database.service';
import { FuncionesUtilesService } from 'src/app/services/funciones-utiles.service';
import { roles } from 'src/app/services/info-compartida.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-actualizador-de-precio-producto',
  templateUrl: './actualizador-de-precio-producto.component.html',
  styleUrls: ['./actualizador-de-precio-producto.component.scss'],
})
export class ActualizadorDePrecioProductoComponent implements OnInit {
  producto!: Producto;
  productoAModificar!: Producto;
  roles = roles;
  loggedUser!: User;
  precioDolarBlue: number = 0;
  ruta!: string;

  costoForm = new FormGroup({
    costo: new FormControl(null || 0, [Validators.required]),
  });
  constructor(public funcionesUtiles: FuncionesUtilesService,
    private spinnerService: SpinnerService,
    private database: DataBaseService,
    private modalController: ModalController,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.productoAModificar = this.funcionesUtiles.clonarObjeto(this.producto);
    this.costoForm.patchValue({
      costo: (this.productoAModificar.costo* this.precioDolarBlue)
    })
  }
  guardarProducto() {
    let { costo } = this.costoForm.value

    if (costo && costo > 0) {
      this.productoAModificar.costo = (costo / this.precioDolarBlue) || 0;
      this.productoAModificar.precio = this.calcularPrecioConRecargos(costo);
      console.log(this.productoAModificar);
      this.alertService.alertConfirmacion('Confirmación', '¿Esta seguro de cargar ese valor?', 'Sí', () => {
        console.log(this.productoAModificar)
        // return;
        this.spinnerService.showLoading('Actualizando costo y precio');
        if (this.productoAModificar && this.productoAModificar.id) {
          //@ts-ignore
          this.database.actualizar(environment.TABLAS.productos, this.productoAModificar, this.productoAModificar.id).then((res) => {
            this.costoForm.reset();
            this.modalController.dismiss(this.productoAModificar, 'actualizado');
          }).catch((err) => {
            console.error(err);
          }).finally(() => {
            this.spinnerService.stopLoading();
          })
        }
      })

    }
  }

  calcularPrecioConRecargos(costo: number): number {
    if (
      (!this.producto.margen && this.producto.margen != 0) ||
      (!this.producto.iva && this.producto.iva != 0) ||
      (!this.producto.financiamiento && this.producto.financiamiento != 0)
    ) return 0;

    // Los recargos son números entre 1 y 100, por lo que deben ser convertidos a porcentajes
    let precioConMargen = costo * (1 + this.producto.margen / 100);
    // console.log('precioConMargen', precioConMargen);
    let precioConIva = precioConMargen * (1 + this.producto.iva / 100);
    // console.log('precioConIva', precioConIva);
    let precioConFinanciamiento = precioConIva * (1 + this.producto.financiamiento / 100);

    // console.log('precioConFinanciamiento', precioConFinanciamiento);
    return precioConFinanciamiento;
  }
}
