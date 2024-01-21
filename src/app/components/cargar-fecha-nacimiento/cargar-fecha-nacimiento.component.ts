import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-cargar-fecha-nacimiento',
  templateUrl: './cargar-fecha-nacimiento.component.html',
  styleUrls: ['./cargar-fecha-nacimiento.component.scss'],
})
export class CargarFechaNacimientoComponent  implements OnInit {

  modoActualizar = false;
  fNacimiento!: string;
  formFNacimiento = new FormGroup({
    fNacimiento: new FormControl('', [Validators.required])
  })

  constructor(public modalController: ModalController) {
  }

  ngOnInit() {
    this.formFNacimiento.controls.fNacimiento.setValue(this.fNacimiento);

  }
  guardar() {
    this.modalController.dismiss(this.formFNacimiento.controls.fNacimiento.value, 'create');
  }
}
