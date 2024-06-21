import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Producto } from '../../nueva-funcionalidad/nueva-funcionalidad.component';
import { DataBaseService } from 'src/app/services/database.service';
import { environment } from 'src/environments/environment';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-form-impuestos-producto',
  templateUrl: './form-impuestos-producto.component.html',
  styleUrls: ['./form-impuestos-producto.component.scss'],
})
export class FormImpuestosProductoComponent implements OnInit {
  impuestosGenerales: boolean = false;
  producto!: Producto;
  impuestosForm = new FormGroup({
    iva: new FormControl(0, [Validators.required, Validators.minLength(2)]),
    margen: new FormControl(0, []),
    financiamiento: new FormControl(0, [Validators.required]),
  })
  impuestosOriginales!: {
    id: string,
    iva: number,
    margen: number,
    financiamiento: number,
  };
  constructor(private database: DataBaseService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    if (!this.impuestosGenerales) { //es impuesto por producto.
      this.impuestosForm.patchValue(this.producto);
    } else {
      this.database.obtenerPorId(environment.TABLAS.recargosProductos, 'recargos').subscribe((res: any) => {
        this.impuestosOriginales = res.payload.data();
        this.impuestosOriginales.id = res.payload.id;
        this.impuestosForm.patchValue(this.impuestosOriginales);
      })
    }
  }
  guardarCambios() {
    let impuestosActuales: any = this.impuestosForm.value;
    if (this.impuestosGenerales) {
      this.alertService.alertConfirmacion('Confirmacion', 'Estara modificando todos los productos con estos nuevos valores, ¿Quiere continuar"', 'Si', () => {
        this.modificarTodosLosProductos();
        this.database.actualizar(environment.TABLAS.recargosProductos, impuestosActuales, this.impuestosOriginales.id)?.then(res => {
          console.log(res)
        });
      })
    } else {
      //aca cambiamos el impuesto del producto individual..
      let { iva, financiamiento, margen } = this.impuestosForm.value as any;
      this.producto.iva = iva;
      this.producto.financiamiento = financiamiento;
      this.producto.margen = margen;
      this.database.actualizar(environment.TABLAS.productos, this.producto, this.producto.id)?.then(res => {
        console.log(res)
      });
      console.log(this.producto)

    }

  }
  modificarTodosLosProductos() {
    let subs = this.database.obtenerTodos(environment.TABLAS.productos).subscribe((docsProductosRef: any) => {
      subs.unsubscribe();
      if (docsProductosRef.length <= 0) return;
      let productos = docsProductosRef.map((productoRef: any) => {
        let producto = productoRef.payload.doc.data();
        producto['id'] = productoRef.payload.doc.id;
        producto['precio'] = this.calcularPrecioConRecargos(producto.costo);
        return producto;
      });

      productos.forEach((prod: Producto) => {
        prod.iva = this.impuestosOriginales.iva;
        prod.margen = this.impuestosOriginales.margen;
        prod.financiamiento = this.impuestosOriginales.financiamiento;

        this.database.actualizar(environment.TABLAS.productos, prod, prod.id);
      });
    });
  }



  calcularPrecioConRecargos(costo: number) {

    if (this.impuestosOriginales.financiamiento !== undefined && this.impuestosOriginales.iva !== undefined && this.impuestosOriginales.margen !== undefined &&
      !isNaN(Number(this.impuestosOriginales.financiamiento)) && !isNaN(Number(this.impuestosOriginales.iva)) && !isNaN(Number(this.impuestosOriginales.margen))
    ) {
      // Convertimos los porcentajes a fracciones decimales
      let margenDecimal = Number(this.impuestosOriginales.margen) / 100;
      let ivaDecimal = Number(this.impuestosOriginales.iva) / 100;
      let financiamientoDecimal = Number(this.impuestosOriginales.financiamiento) / 100;

      // Aplicamos los recargos
      let precioConMargen = costo * (1 + margenDecimal);
      let precioConIva = precioConMargen * (1 + ivaDecimal);
      let precioConFinanciamiento = precioConIva * (1 + financiamientoDecimal);

      // Asignamos el precio final al producto
      return precioConFinanciamiento;
    } else {
      console.log("no se puede calcular");
      return 0;
    }
  }

  calcularPrecioConRecargosDelProducto(producto: Producto) {
    let recargos = this.impuestosForm.value;
    console.log(recargos);

    if (recargos.financiamiento !== undefined && recargos.iva !== undefined && recargos.margen !== undefined &&
      !isNaN(Number(recargos.financiamiento)) && !isNaN(Number(recargos.iva)) && !isNaN(Number(recargos.margen))
    ) {
      // Convertimos los porcentajes a fracciones decimales
      let margenDecimal = Number(recargos.margen) / 100;
      let ivaDecimal = Number(recargos.iva) / 100;
      let financiamientoDecimal = Number(recargos.financiamiento) / 100;

      // Aplicamos los recargos
      let precioConMargen = producto.costo * (1 + margenDecimal);
      let precioConIva = precioConMargen * (1 + ivaDecimal);
      let precioConFinanciamiento = precioConIva * (1 + financiamientoDecimal);

      // Asignamos el precio final al producto
      producto['precio'] = precioConFinanciamiento;
    } else {
      console.log("no se puede calcular");
    }
  }


}
