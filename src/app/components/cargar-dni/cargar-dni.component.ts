import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-cargar-dni',
  templateUrl: './cargar-dni.component.html',
  styleUrls: ['./cargar-dni.component.scss'],
})
export class CargarDniComponent  implements OnInit {
  modoActualizar = false;
  dni!: string;
  formDni = new FormGroup({
    dni: new FormControl('', [Validators.required])
  })

  constructor(public modalController: ModalController) {
  }

  ngOnInit() {
    this.formDni.controls.dni.setValue(this.dni);

  }
  guardar() {
    this.modalController.dismiss(this.formDni.controls.dni.value, 'create');
  }
}

