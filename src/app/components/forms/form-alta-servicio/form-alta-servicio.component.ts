import { Component, OnInit, Input } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataBaseService } from 'src/app/services/database.service';
import { InfoCompartidaService, Servicio } from 'src/app/services/info-compartida.service';
import { environment } from 'src/environments/environment';
import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AlertService } from 'src/app/services/alert.service';
import { ToastColor, ToastService } from 'src/app/services/toast.service';
import { FuncionesUtilesService } from 'src/app/services/funciones-utiles.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import { ModalController } from '@ionic/angular';
@Component({
  selector: 'app-form-alta-servicio',
  templateUrl: './form-alta-servicio.component.html',
  styleUrls: ['./form-alta-servicio.component.scss'],
})
export class FormAltaServicioComponent implements OnInit {

  servicio!: Servicio;
  modoEdicion: boolean = false;
  servicios: any[] = [];

  formServicio: FormGroup = new FormGroup({
    nombre: new FormControl('', Validators.required),
    tipo: new FormControl('', Validators.required),
    desde: new FormControl('', Validators.required),
    hasta: new FormControl(''),
    precioDesdeST: new FormControl(''),
    precioHastaST: new FormControl(''),
    descripcion: new FormControl('')
  });


  constructor(
    private infoConpatida: InfoCompartidaService,
    private dataBase: DataBaseService,
    private modalController:ModalController,
    private alertService: AlertService,
    private toastService: ToastService,
    private afs: AngularFirestore,
    private spinnerService: SpinnerService,
    private funcionesUtiles: FuncionesUtilesService) {


  }

  cargarInputAutoCompletado() {
    let listaSinRepetir = new Set();

    this.afs.collection(environment.TABLAS.servicios).snapshotChanges().subscribe(res => {
      this.servicios = res.map(servicioRef => {
        let auxServicio: any = servicioRef.payload.doc.data()
        auxServicio['id'] = servicioRef.payload.doc.id;
        return auxServicio;
      });
      this.servicios.forEach(servicio => {
        listaSinRepetir.add(servicio['modelo']);
      })
    });
  }


  ngOnInit(): void {
    console.log(this.servicio)
    if (this.servicio) {
      this.formServicio.patchValue({
        nombre: this.servicio.nombre,
        tipo: this.servicio.tipo,
        desde: this.servicio.desde,
        hasta: this.servicio.hasta,
        precioDesdeST: this.servicio.precioDesdeST,
        precioHastaST: this.servicio.precioHastaST,
        descripcion: this.servicio.descripcion
      });
    }
  }

  agregarServicio(nuevoServicio: Servicio) {
    this.spinnerService.showLoading('Creando servicio');
    this.dataBase.crear(environment.TABLAS.servicios, nuevoServicio).then(() => {
      this.toastService.simpleMessage('Exito', 'Se agrego el servicio correctamente', ToastColor.success);
      this.formServicio.reset();
    }).finally(() => {
      this.spinnerService.stopLoading();
    });
  }
  modificarServicio(nuevoServicio: Servicio) {
    this.spinnerService.showLoading('Modificando servicio');
    //@ts-ignore
    this.dataBase.actualizar(environment.TABLAS.servicios, nuevoServicio, this.servicio.id).then(() => {
      this.toastService.simpleMessage('Exito', 'Se modifico el servicio correctamente', ToastColor.success);
      this.formServicio.reset();
    }).finally(() => {
      this.spinnerService.stopLoading();
      this.modalController.dismiss();
    });
  }



  async procesarServicio() {
    let mensaje = this.modoEdicion ? '¿Quiere modificar el servicio?' : '¿Quiere dar de alta este servicio?';
    this.alertService.alertConfirmacion('Confirmación', mensaje, "Si", () => {
      const nuevoServicio = this.formServicio.value;

      if (nuevoServicio.tipo == 'fijo') {
        nuevoServicio.hasta = nuevoServicio.desde;
        nuevoServicio.precioHastaST = nuevoServicio.precioDesdeST;
      }
      this.modoEdicion ?
        this.modificarServicio(nuevoServicio)
        : this.agregarServicio(nuevoServicio);
    })
  }

}

