import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { DataBaseService } from 'src/app/services/database.service';
import { ToastColor, ToastService } from 'src/app/services/toast.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-form-acreedor',
  templateUrl: './form-acreedor.component.html',
  styleUrls: ['./form-acreedor.component.scss'],
})
export class FormAcreedorComponent implements OnInit {

  step = 1;
  @Output() cerrarFormEvent = new EventEmitter();
  acreedorEncontrado = false;
  dioDeAlta = false;
  nuevoAcreedor: any = {
    nombre: "",
    apellido: "",
    dni: "",
    direccion: "",
    telefono: "",
    items: [],
    pagos: [],
    deudaTotal: 0,
    montoTotal: 0,
    fechaLimite: ''
  }
  listaAcreedores = [];
  pagos = [];
  items = [];

  // fechaLimite = new FormControl('');
  formGroupDatosCliente = new FormGroup({
    nombre: new FormControl('', [Validators.required, Validators.minLength(4)]),
    apellido: new FormControl('', Validators.required),
    dni: new FormControl('', Validators.required),
    direccion: new FormControl('', Validators.required),
    telefono: new FormControl('', Validators.required),
  });
  formGroupItem = new FormGroup({
    producto: new FormControl('', Validators.required),
  });
  formGroupPago = new FormGroup({
    concepto: new FormControl(''),
    monto: new FormControl(''),
  });


  constructor(private dataBase: DataBaseService,
    private toastService: ToastService,
    private modalController: ModalController
    // readonly snackBar: MatSnackBar, 
    // public dialogRef: MatDialogRef<FormAltaAcreedorComponent>,
  ) {

  }
  ngOnInit() {
    //TODO buscar acreedor por DNI y no trayendo todos!
    this.dataBase.obtenerTodos(environment.TABLAS.acreedores)
      .subscribe(res => {
        this.listaAcreedores = res.map(ref => ref.payload.doc.data())
      });
  }

  // guardarFecha(fecha) {
  //   this.fechaLimite.setValue(fecha);
  // }
  cerrarForm() {
    this.modalController.dismiss();
    // this.dialogRef.close();
    // this.cerrarFormEvent.emit();
    this.resetAcreedor();
  }


  agregarItems(items) {
    this.nuevoAcreedor.items = items;
  }

  eliminarPago(selectedItem) {
    this.pagos.splice(this.pagos.findIndex(item => selectedItem === item), 1);
  }
  agregarPago() {
    let pago = this.formGroupPago.value;
    if (Number(pago.monto) > 0) {
      pago['fecha'] = Date.now();
      this.pagos.push(pago);
    }
    this.formGroupItem.reset();

  }

  agregarItem() {
    let item = this.formGroupItem.value;

    let existe = this.items.find(auxItem => item == auxItem);
    if (!existe) {
      item['fecha'] = Date.now();
      this.items.push(item);
    }
    this.formGroupItem.reset();
  }
  eliminarItem(selectedItem) {
    this.items.splice(this.items.findIndex(item => selectedItem === item), 1);

    // this.items = this.items.ilter(item => item != selectedItem);

  }


  buscarAcreedor() {
    let clienteIngresado = this.formGroupDatosCliente.value;
    let acreedorExistente = this.listaAcreedores.find(acreedor => {
      if (acreedor['dni'] == clienteIngresado['dni'] ||
        acreedor['telefono'] == clienteIngresado['telefono']) {
        return acreedor;
      }
    });
    if (acreedorExistente) {
      this.acreedorEncontrado = true;
      this.nuevoAcreedor = <any>acreedorExistente;
    } else {
      this.acreedorEncontrado = false;
    }
  }
  // cargarFecha() {
  //   if (this.fechaLimite.value) return;
  //   let fechaLimite: any = new Date(Date.now());
  //   fechaLimite.setDate(fechaLimite.getDate() + 30);
  //   this.fechaLimite.setValue(fechaLimite);
  // }

  confirmar() {
    this.dioDeAlta = true;
    // this.cargarFecha();

    this.nuevoAcreedor = {
      ...this.formGroupDatosCliente.value,
      pagos: this.pagos,
      items: this.items,
      // fechaLimite: this.fechaLimite.value
    };

    if (this.nuevoAcreedor.items.length <= 0) {
      this.toastService.simpleMessage('', 'Debe ingresar algun item a la compra', ToastColor.warning)
      return;
    };

    this.nuevoAcreedor['fechaCreacion'] = Date.now();
    this.dataBase.crear('acreedores', this.nuevoAcreedor).then(() => {
      this.toastService.simpleMessage('Exito', 'Se agrego con exito', ToastColor.success)

    }).catch(err => {
      this.toastService.simpleMessage('Error', err, ToastColor.danger)

    }).finally(() => {
      this.cerrarForm();
    });
  }

  resetAcreedor() {
    this.nuevoAcreedor = {
      nombre: "",
      apellido: "",
      dni: "",
      direccion: "",
      telefono: "",
      items: [],
      pagos: [],
      deudaTotal: 0,
      montoTotal: 0,
      fechaLimite: ''
    }
    this.dioDeAlta = false;
    this.formGroupDatosCliente.reset();
    this.formGroupItem.reset();
    this.formGroupPago.reset();
  }

}
