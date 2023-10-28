import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { User } from 'src/app/clases/user';
import { Proveedor } from 'src/app/pages/proveedores/proveedores.page';
import { AlertService } from 'src/app/services/alert.service';
import { DataBaseService } from 'src/app/services/database.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import { ToastColor, ToastService } from 'src/app/services/toast.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-form-alta-proveedor',
  templateUrl: './form-alta-proveedor.component.html',
  styleUrls: ['./form-alta-proveedor.component.scss'],
})
export class FormAltaProveedorComponent implements OnInit {
  loggedUser!:User;
  formAltaProveedor = new FormGroup({
    nombre: new FormControl('', [Validators.required]),
    direccion: new FormControl('', [Validators.required]),
    telefono: new FormControl('', [Validators.required]),
    telefonoAlternativo: new FormControl('', []),
  })
  constructor(private alertService: AlertService,
    private spinnerService: SpinnerService,
    private database: DataBaseService,
    private toastService: ToastService,
    private modalController: ModalController) { }

  ngOnInit() { }

  mostrarConfirmacion() {
    let { nombre, direccion, telefono, telefonoAlternativo } = this.formAltaProveedor.value;
    if (!nombre! || !direccion || !telefono || !telefonoAlternativo) return;  //TODO: informar
    let proveedor: Proveedor = {
      nombre,
      direccion,
      telefono,
      telefonoAlternativo,
      modulos: []
    }

    // let hoy = new Date(Date.now());

    // const months = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
    // let month = months[hoy.getMonth()];
    // let year = hoy.getFullYear();

    this.alertService.alertConfirmacion(
      'Confirma los datos',
      `Nombre:<b> ${nombre}</b><br> 
      Direccion: <b>${direccion}</b> <br>  
      Telefono: <b>${telefono}</b> <br>  
      Telefono alternativo: <b>${telefonoAlternativo ? telefonoAlternativo : 'NO'}</b> <br><br>`,
      'Confirmar',
      () => {

        this.spinnerService.showLoading("Generando la boleta digital...")

        this.database.crear(environment.TABLAS.proveedores, proveedor).then(res => {
          this.toastService.simpleMessage("Exito!", "Se agrego con exito el nuevo proveedor", ToastColor.success);

          this.spinnerService.stopLoading();
          this.modalController.dismiss();
        });

      }).catch(err => {
        this.spinnerService.stopLoading();
      })

  }

}
