import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { ToastColor, ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-generar-clave',
  templateUrl: './generar-clave.component.html',
  styleUrls: ['./generar-clave.component.scss'],
})
export class GenerarClaveComponent implements OnInit {
  formPassword = new FormGroup({
    password: new FormControl('', [Validators.required]),
    repeatPassword: new FormControl('', [Validators.required]),
  })
  constructor(private modalController: ModalController,
    private toastService: ToastService) { }

  ngOnInit() { }

  guardar() {
    let { password, repeatPassword } = this.formPassword.value;
    if (password == repeatPassword) {
      this.modalController.dismiss(this.formPassword.controls.password.value, 'create');
    } else {
      this.toastService.simpleMessage("Las contraseñas no coinciden.", '', ToastColor.warning);
    }
  }
}
