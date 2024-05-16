import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TrabajosTercerizadosPage, trabajoTercerizado } from 'src/app/pages/trabajos-tercerizados/trabajos-tercerizados.page';
import { DataBaseService } from 'src/app/services/database.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import { ToastColor, ToastService } from 'src/app/services/toast.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-form-alta-trabajo-tercerizado',
  templateUrl: './form-alta-trabajo-tercerizado.component.html',
  styleUrls: ['./form-alta-trabajo-tercerizado.component.scss'],
})
export class FormAltaTrabajoTercerizadoComponent implements OnInit {

  formulario: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private database: DataBaseService,
    private spinnerService: SpinnerService,
    private toastService: ToastService) {
    this.formulario = this.formBuilder.group({
      modelo: [null, Validators.required],
      trabajo: [null, Validators.required],
      boleta: [null, Validators.required],
      responsable: ["Yanke", Validators.required],
      detallesDelEquipo: [null, Validators.required],
    });
  }
  ngOnInit() {

  }

  onSubmit() {
    if (this.formulario.valid) {
      let { modelo, trabajo, boleta, detallesDelEquipo, responsable } = this.formulario.value
      let trabajoTercerizado: trabajoTercerizado = {
        modelo,
        trabajo,
        boleta,
        detallesDelEquipo,
        costo: 0,
        fecha: Date.now(),
        fechaRetiro: -1,
        precio: 0,
        responsable,
        reparado: false,
      }
      this.spinnerService.showLoading('Cargando...');
      this.database.crear(environment.TABLAS.trabajos_tercerizados, trabajoTercerizado).then(res => {
        this.toastService.simpleMessage('Exito', 'Se creo correctamente', ToastColor.success);
        this.formulario.reset();
      }).catch(err => {
        this.toastService.simpleMessage('Error', 'Hubo un error al agregar el trabajo tercerizado', ToastColor.danger);
      }).finally(() => {
        this.spinnerService.stopLoading();
      })
      // Realizar acción con los datos del formulario
      //console.log(trabajoTercerizado);
    } else {
      // Formulario inválido, mostrar errores o tomar acción adicional
    }
  }


}
