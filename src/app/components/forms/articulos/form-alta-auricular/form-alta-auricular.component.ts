import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Articulo } from 'src/app/clases/articulo';
import { conexionAuricular } from 'src/app/interfaces/articulos/auricular';

@Component({
  selector: 'app-form-alta-auricular',
  templateUrl: './form-alta-auricular.component.html',
  styleUrls: ['./form-alta-auricular.component.scss'],
})
export class FormAltaAuricularComponent implements OnInit {

  @Input() articulo!: Articulo;
  conexiones: conexionAuricular[] = [conexionAuricular.auxiliar, conexionAuricular.bluetooth, conexionAuricular.lightning, conexionAuricular.type_c];

  articuloFormGroup = new FormGroup({
    marca: new FormControl('', [Validators.required]),
    conexion: new FormControl([], [Validators.required]),
    cancelacionRuido: new FormControl(false, [Validators.required]),
    imagen: new FormControl('', []),
    microfono: new FormControl(false, [Validators.required]),
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


