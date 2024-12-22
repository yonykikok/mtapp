import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { AlertService } from 'src/app/services/alert.service';
import { DataBaseService } from 'src/app/services/database.service';
import { FormsValidatorsService } from 'src/app/services/forms-validators.service';
import { ToastColor, ToastService } from 'src/app/services/toast.service';
import { environment } from 'src/environments/environment';
import { CargarCategoriaComponent } from '../../cargar-categoria/cargar-categoria.component';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-form-pedido',
  templateUrl: './form-pedido.component.html',
  styleUrls: ['./form-pedido.component.scss'],
})
export class FormPedidoComponent implements OnInit {
  categoria: any;
  categoriasPedidos: any[] = [];


  clienteFormGroup = new FormGroup({
    nombre: new FormControl('', [Validators.required]),
    telefono: new FormControl('', [Validators.required]),
    boleta: new FormControl('', []),
    precio: new FormControl('', []),
  });

  pedidoPorCliente = false;
  tipoDeRepuestoFiltrado: Observable<string[]> = new Observable<string[]>();
  // @Output() cerrarFormEvent = new EventEmitter<void>();
  formgroupPedido = new FormGroup({
    tipo: new FormControl(''),//categoria
    modelo: new FormControl('', Validators.required),
    cantidad: new FormControl('', [Validators.required, Validators.min(1), this.formsValidatorsService.isInt]),
    detalle: new FormControl('', Validators.required),
    prioridad: new FormControl('', Validators.required),
  });

  listaDePrioridades = ['Opcional', 'Sin stock', 'Averiguar', 'Urgente'];

  listaTipoDeRepuestos: string[] = ['Bateria', 'Boton estetico', 'Boton fisico(interno)', 'Camara frontal', 'Camara principal',
    'Cubre lente', 'Display', 'Flex de carga', 'Flex home', 'Microfono', 'Modulo', 'Tactil', 'Tapa', 'Parlante altavoz',
    'Parlante oido', 'Pin de carga', 'Placa', 'Porta sim', 'OTRO',];

  constructor(
    private database: DataBaseService,
    private alertService: AlertService,
    private toastService: ToastService,
    private formsValidatorsService: FormsValidatorsService,
    private modalController: ModalController
  ) { }

  ngOnInit() {

    this.database.obtenerPorId(environment.TABLAS.categoriasPedidos, 'categorias').subscribe((res: any) => {
      console.log(res)
      this.categoriasPedidos = res.payload.data().categorias;
    });

    this.tipoDeRepuestoFiltrado = this.formgroupPedido.controls.tipo.valueChanges.pipe(
      startWith(null as unknown), // Convertir primero a 'unknown'
      map(value => this._filter(value as string)), // Luego convertir a 'string'
    );


    // this.tipoDeRepuestoFiltrado = this.formgroupPedido.controls.tipo.valueChanges.pipe(
    //   startWith(''),
    //   map(value => this._filter(value)),
    // );
  }

  showConfirmDialog() {
    let pedido = { ...this.formgroupPedido.value, cliente: this.clienteFormGroup.value };
    console.log(pedido);
    this.alertService.alertConfirmacion('Confirmación', '¿Esta seguro de agregar el pedido?', 'Si, agregar', this.agregarPedido.bind(this, pedido));
  }
  agregarPedido(pedido: any) {
    pedido['fecha'] = Date.now();
    console.log(pedido)
    return;
    this.database.crear(environment.TABLAS.pedidos, pedido).then(res => {
      this.toastService.simpleMessage('Exito', 'Se agrego el pedido a la lista', ToastColor.success);
      this.resetForm();
    })
  }

  private _filter(value: string): any {
    if (value) {
      const filterValue = value.toLowerCase();
      return this.listaTipoDeRepuestos.filter(option => option.toLowerCase().includes(filterValue));
    }
  }

  resetForm() {
    this.formgroupPedido.reset();
    this.clienteFormGroup.reset();
    this.pedidoPorCliente = false;
  }

  async mostrarFormularioNuevaCategoria() {
    let modal = await this.modalController.create({
      component: CargarCategoriaComponent,
      componentProps: {
        isModal: true,
        categoriasPedidos: this.categoriasPedidos
      }
    })


    modal.onDidDismiss().then((result: any) => {
      if (!result.data || !result.role) return;

      if (result.role == 'create') {


        this.categoria = result.data;
        if (this.categoriasPedidos && this.categoriasPedidos.length > 0) {
          this.categoriasPedidos.push(result.data);
        } else {
          this.categoriasPedidos = [result.data];
        }

        this.database.actualizar(environment.TABLAS.categoriasPedidos, { categorias: this.categoriasPedidos }, 'categorias')?.catch(res => {
          this.toastService.simpleMessage("Categoria agregada", "Se agrego la categoria al listado.", ToastColor.success);
        });
      }


    })
    modal.present();
  }
}
