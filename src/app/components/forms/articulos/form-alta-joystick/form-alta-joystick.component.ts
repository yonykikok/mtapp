import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Articulo } from 'src/app/clases/articulo';
import { compatibilidadJoystick, conexionJoystick } from 'src/app/interfaces/articulos/joystick';


@Component({
  selector: 'app-form-alta-joystick',
  templateUrl: './form-alta-joystick.component.html',
  styleUrls: ['./form-alta-joystick.component.scss'],
})
export class FormAltaJoystickComponent implements OnInit {

  @Input() articulo!: Articulo;
  compatibilidades: compatibilidadJoystick[] = [
    compatibilidadJoystick.ios,
    compatibilidadJoystick.android,
    compatibilidadJoystick.pc,
    compatibilidadJoystick.notebook,
    compatibilidadJoystick.ps2,
    compatibilidadJoystick.ps3,
    compatibilidadJoystick.ps4,
    compatibilidadJoystick.ps5];
  conexionJoystick: conexionJoystick[] = [conexionJoystick.usb, conexionJoystick.cable, conexionJoystick.bluetooth];

  articuloFormGroup = new FormGroup({
    marca: new FormControl('', [Validators.required]),
    compatibilidad: new FormControl('', [Validators.required]),
    imagen: new FormControl('', []),
    conexion: new FormControl('', [Validators.required]),
  });


  constructor(private modalController: ModalController) {

  }
  ngOnInit(): void {
    // this.articuloFormGroup.patchValue(this.articulo);
    console.log(this.articuloFormGroup.value)
  }

  guardarJoystick() {
    if (this.articuloFormGroup.valid) {
      this.modalController.dismiss(this.articuloFormGroup.value, 'continuar');
      // Aquí puedes realizar la lógica para guardar el nuevo joystick en tu base de datos o en tu servicio.
      // Por ejemplo, puedes llamar a un servicio que maneje la lógica de almacenamiento.
    }
  }

}
