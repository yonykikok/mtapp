import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataBaseService } from 'src/app/services/database.service';
import { environment } from 'src/environments/environment';
// import { Producto } from '../../nueva-funcionalidad/nueva-funcionalidad.component';
import { SpinnerService } from 'src/app/services/spinner.service';
import { ModalController } from '@ionic/angular';
import { CargarCategoriaComponent } from '../../cargar-categoria/cargar-categoria.component';
import { ToastColor, ToastService } from 'src/app/services/toast.service';
import { FuncionesUtilesService } from 'src/app/services/funciones-utiles.service';
import { Roles, User } from 'src/app/clases/user';
import { roles } from 'src/app/services/info-compartida.service';
import { Producto } from 'src/app/pages/lista-productos/lista-productos.page';

@Component({
  selector: 'app-form-alta-producto',
  templateUrl: './form-alta-producto.component.html',
  styleUrls: ['./form-alta-producto.component.scss'],
})
export class FormAltaProductoComponent implements OnInit {
  categoria: any;
  categoriasProductos: any[] = [];


  roles = roles;
  loggedUser!: User;

  modoActualizarInformacion: boolean = false;
  productoAModificar!: Producto;
  precioDolarBlue: number = 0;

  colorSeleccionado!: string;
  coloresSeleccionados: { stock: number, color: string, denominacionColor: string }[] = [];
  productoForm = new FormGroup({
    producto: new FormControl('', [Validators.required, Validators.minLength(2)]),
    marca: new FormControl('', []),
    codigo: new FormControl('', []),
    costo: new FormControl(0, [Validators.required]),
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
    private toastService: ToastService,
    public funcionesUtiles: FuncionesUtilesService
  ) { }

  ngOnInit() {
    this.database.obtenerPorId(environment.TABLAS.recargosProductos, 'recargos').subscribe((res: any) => {

      this.recargos = res.payload.data();
    });

    this.database.obtenerPorId(environment.TABLAS.categoriasProductos, 'categorias').subscribe((res: any) => {

      this.categoriasProductos = res.payload.data().categorias;
    });

    if (this.modoActualizarInformacion) {
      //@ts-ignore
      this.productoForm.patchValue(this.productoAModificar);

      this.productoForm.patchValue({
        //@ts-ignore
        costo: (this.productoAModificar.costo * this.precioDolarBlue)
      });
      this.coloresSeleccionados = [...this.productoAModificar.coloresDisponibles || []];
      this.categoria = this.productoAModificar.categoria
    }

  }
  guardarProducto() {
    //validar existencia del codigo de barras.
    //
    let productoForm = { ...this.productoForm.value, coloresDisponibles: this.coloresSeleccionados, cantidad: 0 };
    //crear uno si no existe.

    if (productoForm.marca && (productoForm.costo || productoForm.costo == 0) && productoForm.producto) {
      let producto: Producto = {
        id: 'idtemporal',
        categoria: this.categoria,
        producto: productoForm.producto,
        marca: productoForm.marca,
        codigo: productoForm.codigo ? productoForm.codigo : this.generarCodigoDebarras(),
        costo: (productoForm.costo / this.precioDolarBlue)||0,
        financiamiento: this.recargos.financiamiento,
        iva: this.recargos.iva,
        margen: this.recargos.margen,
        coloresDisponibles: productoForm.coloresDisponibles,
        stockTotal: productoForm.coloresDisponibles?.reduce((total: number, color: any) => {
          return total + color.stock;
        }, 0),
        // cantidad: 0,
        images: [],
        imgUrlsRef: [],
        precio: 0
      };
      console.log(producto)

      this.spinnerService.showLoading('Creando producto');
      this.database.crear(environment.TABLAS.productos, producto).then((res) => {
        this.productoForm.reset();
        this.stockForm.reset();
        this.coloresSeleccionados = [];
      }).catch((err) => {
        console.error(err);
      }).finally(() => {
        ``
        this.spinnerService.stopLoading();
      })

    }
  }
  guardarNuevaInfoDelProducto() {
    if (this.modoActualizarInformacion) {

      let productoForm: any = { ...this.productoForm.value, coloresDisponibles: this.coloresSeleccionados };
      console.log(productoForm)
      this.productoAModificar.categoria = this.categoria,
        this.productoAModificar.producto = productoForm.producto,
        this.productoAModificar.marca = productoForm.marca,
        this.productoAModificar.codigo = productoForm.codigo ? productoForm.codigo : this.generarCodigoDebarras(),
        this.productoAModificar.costo = (productoForm.costo / this.precioDolarBlue)||0,
        this.productoAModificar.coloresDisponibles = productoForm.coloresDisponibles,
        this.productoAModificar.stockTotal = productoForm.coloresDisponibles.reduce((total: number, color: any) => {
          return total + color.stock;
        }, 0),
        console.log(this.productoAModificar);
      // this.productoAModificar.
      this.spinnerService.showLoading('Actualizando producto');
      //@ts-ignore
      this.database.actualizar(environment.TABLAS.productos, this.productoAModificar, this.productoAModificar.id).then((res) => {
        this.productoForm.reset();
        this.stockForm.reset();
        this.modalController.dismiss();

      }).catch((err) => {
        console.error(err);
      }).finally(() => {
        this.spinnerService.stopLoading();
      })

    } else {
    }
  }

  onColorChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const color = input.value;
    console.log('Color changed to:', color);
    this.stockForm.patchValue({ denominacionColor: '' });
    // Aquí puedes realizar cualquier acción adicional que necesites cuando cambie el color
  }

  generarCodigoDebarras(): string {
    return 'asfsafsafsafsafsa';
  }

  // calcularPrecioConRecargos(costo: number) {
  //   console.log(costo)
  //   console.log(this.recargos)
  //   let precioConMargen = (costo * Number(`1.${this.recargos.margen}`));
  //   let precioConIva = (precioConMargen * Number(`1.${this.recargos.iva}`));
  //   let precioConFinanciamiento = (precioConIva * Number(`1.${this.recargos.financiamiento < 10 ? '0' + this.recargos.financiamiento : this.recargos.financiamiento}`));
  //   return precioConFinanciamiento;
  // }

  calcularPrecioConRecargos(costo: number): number {
    if (!this.recargos) return 0;
    // Los recargos son números entre 1 y 100, por lo que deben ser convertidos a porcentajes
    let precioConMargen = costo * (1 + this.recargos.margen / 100);
    // console.log('precioConMargen', precioConMargen);
    let precioConIva = precioConMargen * (1 + this.recargos.iva / 100);
    // console.log('precioConIva', precioConIva);
    let precioConFinanciamiento = precioConIva * (1 + this.recargos.financiamiento / 100);

    // console.log('precioConFinanciamiento', precioConFinanciamiento);
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
  eliminarColor(indice: number) {
    this.coloresSeleccionados.splice(indice, 1);
  }
}
