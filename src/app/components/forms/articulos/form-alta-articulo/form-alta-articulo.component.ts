import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Cargador, compatibilidad, tiposCargadores, velocidad } from 'src/app/interfaces/articulos/cargador';

@Component({
  selector: 'app-form-alta-articulo',
  templateUrl: './form-alta-articulo.component.html',
  styleUrls: ['./form-alta-articulo.component.scss'],
})
export class FormAltaArticuloComponent {



  constructor(private modalController: ModalController) { }
  categorias = [];
  articuloFormGroup = new FormGroup({
    categoria: new FormControl('', [Validators.required]),
    nombre: new FormControl('', [Validators.required]),
    precio: new FormControl('', [Validators.required, Validators.min(0)]),
    codigoDeBarra: new FormControl('', [Validators.required])
  })
  guardarCargador() {
    if (this.articuloFormGroup.valid) {
      this.modalController.dismiss(this.articuloFormGroup.value, 'continuar');
      // Aquí puedes realizar la lógica para guardar el nuevo cargador en tu base de datos o en tu servicio.
      // Por ejemplo, puedes llamar a un servicio que maneje la lógica de almacenamiento.
    }
  }

}
