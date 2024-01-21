import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-cargar-telefono',
  templateUrl: './cargar-telefono.component.html',
  styleUrls: ['./cargar-telefono.component.scss'],
})
export class CargarTelefonoComponent implements OnInit {
  modoActualizar=false;
  formTelefono = new FormGroup({
    telefono: new FormControl('', [Validators.required])
  })
  constructor(public modalController:ModalController) { }

  ngOnInit() {}

  guardar(){
    this.modalController.dismiss(this.formTelefono.controls.telefono.value,'create');
  }
}
