import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EstadoRepuesto, Ubicaciones } from 'src/app/clases/glass';

@Component({
  selector: 'app-form-alta-glass',
  templateUrl: './form-alta-glass.component.html',
  styleUrls: ['./form-alta-glass.component.scss'],
})
export class FormAltaGlassComponent implements OnInit {
  Ubicaciones = Ubicaciones;
  glassForm: FormGroup = new FormGroup({
    marca: new FormControl('', [Validators.required]),
    modelo: new FormControl('', [Validators.required]),
    precio: new FormControl('', [Validators.required]),
    marco: new FormControl(false, [Validators.required]),
    oca: new FormControl(true, [Validators.required]),
    touch: new FormControl(false, [Validators.required]),
    curvo: new FormControl(false, [Validators.required]),
    stock: new FormControl('', [Validators.required]),
    compatibilidad: new FormControl('', [Validators.required]),
    ubicacionRepuesto: new FormControl('', [Validators.required]),
    estado: new FormControl(true, [Validators.required]),
  })
  constructor() { }

  ngOnInit() { }
  onSubmit() { }


  darTodosLosPermisos(configuracion: any) {
    configuracion.permisos.forEach((permiso: any) => permiso.habilitado = true);
  }
  quitarTodosLosPermisos(configuracion: any) {
    configuracion.permisos.forEach((permiso: any) => permiso.habilitado = false);
  }
}
