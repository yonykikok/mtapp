
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-cargar-correo',
  templateUrl: './cargar-correo.component.html',
  styleUrls: ['./cargar-correo.component.scss'],
})
export class CargarCorreoComponent implements OnInit {
  modoActualizar=false;
  correo;
  formCorreo = new FormGroup({
    correo: new FormControl('', [Validators.required, Validators.email])
  })

  constructor(private modalController: ModalController) {
   }

  ngOnInit() { 
    this.formCorreo.controls.correo.setValue(this.correo);

  }
  guardar(){
    this.modalController.dismiss(this.formCorreo.controls.correo.value,'create');
  }
}
