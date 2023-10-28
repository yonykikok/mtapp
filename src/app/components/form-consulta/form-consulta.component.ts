import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataBaseService } from 'src/app/services/database.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import { ToastColor, ToastService } from 'src/app/services/toast.service';
import { environment } from 'src/environments/environment';

export interface Consulta {
  nombre: string,
  apellido: string,
  telefono: string,
  consulta: string,
  fecha: number,
  visto: boolean,
  respondido: boolean
}
@Component({
  selector: 'app-form-consulta',
  templateUrl: './form-consulta.component.html',
  styleUrls: ['./form-consulta.component.scss'],
})
export class FormConsultaComponent implements OnInit {

  formConsulta = new FormGroup({
    nombre: new FormControl('', [Validators.required]),
    apellido: new FormControl('', [Validators.required]),
    telefono: new FormControl('', [Validators.required]),
    consulta: new FormControl('', [Validators.required]),
  })
  constructor(private database: DataBaseService,
    private toastService: ToastService,
    private spinnerService: SpinnerService) { }

  ngOnInit() { }

  enviarFormulario() {
    let { nombre, apellido, telefono, consulta } = this.formConsulta.value;
    if (!nombre || !apellido || !telefono || !consulta) return; //TODO: informar
    
    let consultaOnline: Consulta = {
      nombre,
      apellido,
      telefono,
      consulta,
      fecha: new Date().getTime(),
      visto: false,
      respondido: false
    };

    this.spinnerService.showLoading('Enviando consulta...');
    this.database.crear(environment.TABLAS.consultas, consultaOnline).then(res => {
      this.toastService.simpleMessage('Exito', 'Se envio la consulta correctamente', ToastColor.success);
    }).catch(err => {
      this.toastService.simpleMessage('Error', 'No se pudo enviar la consulta, debido a un error inesperado', ToastColor.danger);
    }).finally(() => {
      this.spinnerService.stopLoading();
      this.formConsulta.reset();
    })
  }
}
