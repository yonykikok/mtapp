import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataBaseService } from 'src/app/services/database.service';
import { environment } from 'src/environments/environment';
import { Producto } from '../../nueva-funcionalidad/nueva-funcionalidad.component';
import { SpinnerService } from 'src/app/services/spinner.service';
import { ModalController } from '@ionic/angular';
import { CargarCategoriaComponent } from '../../cargar-categoria/cargar-categoria.component';
import { ToastColor, ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-form-alta-producto',
  templateUrl: './form-alta-producto.component.html',
  styleUrls: ['./form-alta-producto.component.scss'],
})
export class FormAltaProductoComponent implements OnInit {
  categoria: any;
  categoriasProductos: any[] = [];

  modoActualizarInformacion: boolean = false;
  productoAModificar!: Producto;


  colorSeleccionado!: string;
  coloresSeleccionados: { stock: number, color: string, denominacionColor: string }[] = [];
  productoForm = new FormGroup({
    producto: new FormControl('', [Validators.required, Validators.minLength(2)]),
    marca: new FormControl('', []),
    codigo: new FormControl('', []),
    costo: new FormControl(null, [Validators.required]),
  })
  stockForm = new FormGroup({
    color: new FormControl('#000000', [Validators.required]),
    stock: new FormControl(1, [Validators.required]),
    denominacionColor: new FormControl('Negro', [Validators.required])
  })
  recargos!: {
    iva: number,
    margen: number,
    financiamiento: number,
  };
  constructor(private database: DataBaseService,
    private spinnerService: SpinnerService,
    private modalController: ModalController,
    private toastService: ToastService
  ) { }

  ngOnInit() {
    this.database.obtenerPorId(environment.TABLAS.recargosProductos, 'recargos').subscribe((res: any) => {
      console.log(res.payload.data())
      this.recargos = res.payload.data();
    });

    this.database.obtenerPorId(environment.TABLAS.categoriasProductos, 'categorias').subscribe((res: any) => {
      console.log(res.payload.data())
      this.categoriasProductos = res.payload.data().categorias;
    });

    if (this.modoActualizarInformacion) {
      //@ts-ignore
      this.productoForm.patchValue(this.productoAModificar);
      this.coloresSeleccionados = [...this.productoAModificar.coloresDisponibles || []];
      this.categoria = this.productoAModificar.categoria
    }

  }
  guardarProducto() {
    //validar existencia del codigo de barras.
    //
    let productoForm = { ...this.productoForm.value, coloresDisponibles: this.coloresSeleccionados, cantidad: 0 };
    //crear uno si no existe.

    if (productoForm.marca && productoForm.costo && productoForm.producto) {
      let producto: Producto = {
        id: this.modoActualizarInformacion ? this.productoAModificar.id : 'idtemporal',
        categoria: this.categoria,
        producto: productoForm.producto,
        marca: productoForm.marca,
        codigo: productoForm.codigo ? productoForm.codigo : this.generarCodigoDebarras(),
        costo: productoForm.costo,
        coloresDisponibles: productoForm.coloresDisponibles,
        cantidad: productoForm.cantidad = productoForm.coloresDisponibles?.reduce((total: number, color: any) => {
          return total + color.stock;
        }, 0) || 0,
        margen: this.recargos.margen,
      };
      console.log(producto)

      if (this.modoActualizarInformacion) {
        this.productoAModificar = { ...this.productoAModificar, ...producto };
        this.spinnerService.showLoading('Actualizando producto');
        //@ts-ignore
        this.database.actualizar(environment.TABLAS.productos, producto, producto.id).then((res) => {
          console.log(res);
        }).catch((err) => {
          console.error(err);
        }).finally(() => {
          this.spinnerService.stopLoading();
        })

      } else {
        this.spinnerService.showLoading('Creando producto');
        this.database.crear(environment.TABLAS.productos, producto).then((res) => {
          console.log(res);
        }).catch((err) => {
          console.error(err);
        }).finally(() => {
          this.spinnerService.stopLoading();
        })
      }
    }


  }

  generarCodigoDebarras(): string {
    return 'asfsafsafsafsafsa';
  }

  calcularPrecioConRecargos(costo: number) {
    let precioConMargen = (costo * Number(`1.${this.recargos.margen}`));
    let precioConIva = (precioConMargen * Number(`1.${this.recargos.iva}`));
    let precioConFinanciamiento = (precioConIva * Number(`1.${this.recargos.financiamiento < 10 ? '0' + this.recargos.financiamiento : this.recargos.financiamiento}`));
    return precioConFinanciamiento;
  }
  agregarColor() {
    let nuevoColor: any = this.stockForm.value;
    // Verificar si el color ya existe en el array
    const existe = this.coloresSeleccionados.some(color => (color.color === nuevoColor.color || color.denominacionColor.toLowerCase() === nuevoColor.denominacionColor.toLowerCase()));

    // Si el color no existe, agregarlo al array
    if (!existe) {
      this.coloresSeleccionados.push(nuevoColor);
      console.log(`El color ${nuevoColor.denominacionColor} ha sido agregado.`);
    } else {
      console.log(`El color ${nuevoColor.denominacionColor} ya existe en la lista.`);
    }
  }


  async mostrarFormularioNuevaCategoria() {
    let modal = await this.modalController.create({
      component: CargarCategoriaComponent,
      componentProps: {
        isModal: true,
        categoriasProductos: this.categoriasProductos
      }
    })


    modal.onDidDismiss().then((result: any) => {
      if (!result.data || !result.role) return;

      if (result.role == 'create') {


        this.categoria = result.data;
        if (this.categoriasProductos && this.categoriasProductos.length > 0) {
          this.categoriasProductos.push(result.data);
        } else {
          this.categoriasProductos = [result.data];
        }

        this.database.actualizar(environment.TABLAS.categoriasProductos, { categorias: this.categoriasProductos }, 'categorias')?.catch(res => {
          this.toastService.simpleMessage("Categoria agregada", "Se agrego la categoria al listado.", ToastColor.success);
        });
      }


    })
    modal.present();
  }
}
