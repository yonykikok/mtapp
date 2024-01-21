import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Articulo } from 'src/app/clases/articulo';
@Component({
  selector: 'app-form-alta-protector-pantalla',
  templateUrl: './form-alta-protector-pantalla.component.html',
  styleUrls: ['./form-alta-protector-pantalla.component.scss'],
})
export class FormAltaProtectorPantallaComponent implements OnInit {



  @Input() articulo!: Articulo;
  compatibilidades: string[] = [];

  articuloFormGroup = new FormGroup({
    modelo: new FormControl("", [Validators.required]),
    tipo: new FormControl("", [Validators.required]),
    compatibilidad: new FormControl('', [Validators.required]),
    imagen: new FormControl("",),
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



