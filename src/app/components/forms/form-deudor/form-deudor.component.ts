import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { DataBaseService } from 'src/app/services/database.service';
import { ToastColor, ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-form-deudor',
  templateUrl: './form-deudor.component.html',
  styleUrls: ['./form-deudor.component.scss'],
})
export class FormDeudorComponent implements OnInit {
  step = 1;
  @Output() cerrarFormEvent = new EventEmitter();
  deudorEncontrado = false;
  dioDeAlta = false;
  nuevoDeudor: any = {
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
  listaDeudores: any[] = [];
  pagos: { concepto: string, fecha: number, monto: number }[] = [];
  items: { producto: string, fecha: number, precio: number }[] = [];

  fechaLimite = new FormControl('');
  formGroupDatosCliente = new FormGroup({
    nombre: new FormControl('', [Validators.required, Validators.minLength(4)]),
    apellido: new FormControl('', Validators.required),
    dni: new FormControl('', Validators.required),
    direccion: new FormControl('', Validators.required),
    telefono: new FormControl('', Validators.required),
  });
  formGroupItem = new FormGroup({
    producto: new FormControl('', Validators.required),
    precio: new FormControl('', Validators.required),
  });
  formGroupPago = new FormGroup({
    concepto: new FormControl(''),
    monto: new FormControl(''),
  });


  constructor(private dataBase: DataBaseService,
    private toastService: ToastService,
    private modalController: ModalController
    // readonly snackBar: MatSnackBar, 
    // public dialogRef: MatDialogRef<FormAltaDeudorComponent>,
  ) {

  }
  ngOnInit() {
    //TODO buscar deudor por DNI y no trayendo todos!
    this.dataBase.obtenerTodos('deudores')
      .subscribe(res => {
        this.listaDeudores = res.map(ref => ref.payload.doc.data())
      });
  }

  guardarFecha(fecha: any) {
    this.fechaLimite.setValue(fecha);
  }
  cerrarForm() {
    this.modalController.dismiss();
    // this.dialogRef.close();
    // this.cerrarFormEvent.emit();
    this.resetDeudor();
  }


  agregarItems(items: any) {
    this.nuevoDeudor.items = items;
  }

  eliminarPago(selectedItem: any) {
    this.pagos.splice(this.pagos.findIndex(item => selectedItem === item), 1);
  }
  agregarPago() {
    let pago: any = this.formGroupPago.value;
    if (Number(pago.monto) > 0) {
      pago['fecha'] = Date.now();
      this.pagos.push(pago);
    }
    this.formGroupItem.reset();

  }

  agregarItem() {
    let item: any = this.formGroupItem.value;

    let existe = this.items.find((auxItem: any) => item == auxItem);
    if (!existe) {
      item['fecha'] = Date.now();
      this.items.push(item);
    }
    this.formGroupItem.reset();
  }
  eliminarItem(selectedItem: any) {
    this.items.splice(this.items.findIndex(item => selectedItem === item), 1);

    // this.items = this.items.ilter(item => item != selectedItem);

  }


  buscarDeudor() {
    let clienteIngresado = this.formGroupDatosCliente.value;
    let deudorExistente = this.listaDeudores.find(deudor => {
      if (deudor['dni'] == clienteIngresado['dni'] ||
        deudor['telefono'] == clienteIngresado['telefono']) {
        return deudor;
      }
    });
    if (deudorExistente) {
      this.deudorEncontrado = true;
      this.nuevoDeudor = <any>deudorExistente;
    } else {
      this.deudorEncontrado = false;
    }
  }
  cargarFecha() {
    if (this.fechaLimite.value) return;
    let fechaLimite: any = new Date(Date.now());
    fechaLimite.setDate(fechaLimite.getDate() + 30);
    this.fechaLimite.setValue(fechaLimite);
  }

  confirmar() {
    this.dioDeAlta = true;
    this.cargarFecha();

    this.nuevoDeudor = {
      ...this.formGroupDatosCliente.value,
      pagos: this.pagos,
      items: this.items,
      fechaLimite: this.fechaLimite.value
    };

    if (this.nuevoDeudor.items.length <= 0) {
      this.toastService.simpleMessage('', 'Debe ingresar algun item a la compra', ToastColor.warning)
      return;
    };

    this.nuevoDeudor['fechaCreacion'] = Date.now();
    this.dataBase.crear('deudores', this.nuevoDeudor).then(() => {
      this.toastService.simpleMessage('Exito', 'Se agrego con exito', ToastColor.success)

    }).catch(err => {
      this.toastService.simpleMessage('Error', err, ToastColor.danger)

    }).finally(() => {
      this.cerrarForm();
    });
  }

  resetDeudor() {
    this.nuevoDeudor = {
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
