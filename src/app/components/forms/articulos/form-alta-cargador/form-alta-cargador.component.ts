import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Articulo } from 'src/app/clases/articulo';
import { Cargador, compatibilidad, tiposCargadores, velocidad } from 'src/app/interfaces/articulos/cargador';

@Component({
  selector: 'app-form-alta-cargador',
  templateUrl: './form-alta-cargador.component.html',
  styleUrls: ['./form-alta-cargador.component.scss'],
})
export class FormAltaCargadorComponent implements OnInit {

  @Input() articulo!: Articulo;
  tipos: tiposCargadores[] = [tiposCargadores.con_cable, tiposCargadores.inalambrico];
  velocidades: velocidad[] = [velocidad.carga_normal, velocidad.carga_rapida, velocidad.turbo_power, velocidad.otros];
  compatibilidades: compatibilidad[] = [compatibilidad.v8, compatibilidad.type_c, compatibilidad.lightning, compatibilidad.otros];

  articuloFormGroup = new FormGroup({
    marca: new FormControl('', [Validators.required]),
    velocidad: new FormControl('', [Validators.required]),
    compatibilidad: new FormControl('', [Validators.required]),
    imagen: new FormControl('', []),
    tipo: new FormControl('', [Validators.required]),
  });


  constructor(private modalController: ModalController) {

  }
  ngOnInit(): void {
    // this.articuloFormGroup.patchValue(this.articulo);
    console.log(this.articuloFormGroup.value)
  }

  guardarCargador() {
    if (this.articuloFormGroup.valid) {
      this.modalController.dismiss(this.articuloFormGroup.value, 'continuar');
      // Aquí puedes realizar la lógica para guardar el nuevo cargador en tu base de datos o en tu servicio.
      // Por ejemplo, puedes llamar a un servicio que maneje la lógica de almacenamiento.
    }
  }
}


