import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-generar-clave',
  templateUrl: './generar-clave.component.html',
  styleUrls: ['./generar-clave.component.scss'],
})
export class GenerarClaveComponent implements OnInit {
  formPassword = new FormGroup({
    password: new FormControl('', [Validators.required])
  })
  constructor(private modalController:ModalController) { }

  ngOnInit() {}

  guardar(){
    this.modalController.dismiss(this.formPassword.controls.password.value,'create');
  }
}
