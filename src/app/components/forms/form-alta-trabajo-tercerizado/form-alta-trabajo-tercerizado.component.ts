import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TrabajosTercerizadosPage, trabajoTercerizado } from 'src/app/pages/trabajos-tercerizados/trabajos-tercerizados.page';
import { DataBaseService } from 'src/app/services/database.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import { ToastColor, ToastService } from 'src/app/services/toast.service';
import { environment } from 'src/environments/environment';

export enum TiposDeTrabajosTercerizadosEnum {
  'Liberacion' = 'Liberacion',
  'SacadoDeCuenta' = 'Sacado de cuenta',
  'PinDeCarga' = 'Pin de carga',
  'Garantia' = 'Garantia',
  'Otro' = 'Otro',
}
@Component({
  selector: 'app-form-alta-trabajo-tercerizado',
  templateUrl: './form-alta-trabajo-tercerizado.component.html',
  styleUrls: ['./form-alta-trabajo-tercerizado.component.scss'],
})
export class FormAltaTrabajoTercerizadoComponent implements OnInit {
  tiposDeTrabajosTercerizadosEnum = TiposDeTrabajosTercerizadosEnum;

  tiposDeTrabajosTercerizados: TiposDeTrabajosTercerizadosEnum[] = [
    TiposDeTrabajosTercerizadosEnum.Liberacion,
    TiposDeTrabajosTercerizadosEnum.SacadoDeCuenta,
    TiposDeTrabajosTercerizadosEnum.PinDeCarga,
    TiposDeTrabajosTercerizadosEnum.Garantia,
    TiposDeTrabajosTercerizadosEnum.Otro
  ];
  tipoDeTrabajoSeleccionado: TiposDeTrabajosTercerizadosEnum = TiposDeTrabajosTercerizadosEnum.Liberacion;
  formulario: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private database: DataBaseService,
    private spinnerService: SpinnerService,
    private toastService: ToastService) {
    this.formulario = this.formBuilder.group({
      modelo: [null, Validators.required],
      trabajo: [null, []],
      boleta: [null, Validators.required],
      responsable: ["Yanke", Validators.required],
      detallesDelEquipo: [null],
      imeiOriginal: [null, []],
      versionAndroidOriginal: [null, []],
    });
  }
  ngOnInit() {

  }

  onSubmit() {
    if (this.formulario.valid) {
      let { modelo, trabajo, boleta, detallesDelEquipo, responsable, imeiOriginal, versionAndroidOriginal } = this.formulario.value
      let trabajoTercerizado: trabajoTercerizado = {
        imeiOriginal,
        versionAndroidOriginal,
        modelo,
        trabajo: this.tipoDeTrabajoSeleccionado != TiposDeTrabajosTercerizadosEnum.Otro ? this.tipoDeTrabajoSeleccionado : trabajo,
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
  actualizarDatos(event: any) {
    if (event.detail.value != TiposDeTrabajosTercerizadosEnum.Liberacion) {
      this.formulario.controls['imeiOriginal'].setValue(null);
      this.formulario.controls['versionAndroidOriginal'].setValue(null);
    }
    console.log(event)
  }
  formularioCompleto(): boolean {
    let retorno = false;
    let { trabajo, imeiOriginal, versionAndroidOriginal } = this.formulario.value
    console.log({ trabajo, imeiOriginal, versionAndroidOriginal })
    console.log(this.formulario.valid)
    console.log(this.tipoDeTrabajoSeleccionado)

    if (this.formulario.valid) {
      if (this.tipoDeTrabajoSeleccionado == TiposDeTrabajosTercerizadosEnum.Liberacion) {

        (imeiOriginal && versionAndroidOriginal > 0)
          ? retorno = true
          : retorno = false;

      } else if (this.tipoDeTrabajoSeleccionado == TiposDeTrabajosTercerizadosEnum.Otro) {
        trabajo
          ? retorno = true
          : retorno = false;
      } else {
        retorno = true;
      }
    }
    return retorno;
  }
}
