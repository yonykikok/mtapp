import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-encuesta-calificacion',
  templateUrl: './encuesta-calificacion.component.html',
  styleUrls: ['./encuesta-calificacion.component.scss'],
})
export class EncuestaCalificacionComponent implements OnInit {
  valorSeleccionado=3;
  constructor(public modalController:ModalController) { }

  ngOnInit() {}

}
