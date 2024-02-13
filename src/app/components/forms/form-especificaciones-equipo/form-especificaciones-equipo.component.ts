import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Browser } from '@capacitor/browser';
import { ModalController } from '@ionic/angular';
import { EquipoDisponible, EquipoEspecificaciones } from 'src/app/services/info-compartida.service';

@Component({
  selector: 'app-form-especificaciones-equipo',
  templateUrl: './form-especificaciones-equipo.component.html',
  styleUrls: ['./form-especificaciones-equipo.component.scss'],
})
export class FormEspecificacionesEquipoComponent implements OnInit {
  equipo!: EquipoDisponible;
  equipoForm: FormGroup = new FormGroup({
    pantalla: new FormControl(null, [Validators.required]),
    resolucion: new FormControl(null, [Validators.required]),
    camaraPrincipal: new FormControl(null, [Validators.required]),
    camaraFrontal: new FormControl(null, [Validators.required]),
    procesador: new FormControl(null, [Validators.required]),
    memoria: new FormControl(null, [Validators.required]),
    almacenamiento: new FormControl(null, [Validators.required]),
  });

  constructor(private formBuilder: FormBuilder, private modalController: ModalController) { }

  ngOnInit() {
  }

  onSubmit() {
    if (this.equipoForm.valid) {
      const equipoEspecificaciones: EquipoEspecificaciones = this.equipoForm.value;
      console.log('Equipo Especificaciones:', equipoEspecificaciones);
      this.modalController.dismiss(equipoEspecificaciones, 'guardar');
      // Puedes hacer algo con el objeto, como enviarlo a un servicio, etc.
    } else {
      console.log('El formulario no es válido');
    }
  }

  cerrarModal() {
    this.modalController.dismiss();
  }

  async buscarEnInternet() {
    const caracteristicasBusqueda = `Características ${this.equipo.marca} ${this.equipo.modelo}`;
    const url = `https://www.google.com/search?q=${encodeURIComponent(caracteristicasBusqueda)}`;

    await Browser.open({ url });
  }
}