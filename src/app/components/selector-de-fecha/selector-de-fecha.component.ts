import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-selector-de-fecha',
  templateUrl: './selector-de-fecha.component.html',
  styleUrls: ['./selector-de-fecha.component.scss'],
})
export class SelectorDeFechaComponent implements OnInit {
  fechaSeleccionada!: Date;
  fechaSeleccionadaDate!: Date;
  maxFechaActual = new Date(new Date().getTime() + 86400000).toISOString().split('T')[0];

  constructor(private modalController: ModalController) { }

  ngOnInit() { }

  updateCalcs(e: any) {
    if (!this.fechaSeleccionadaDate) return;
    let fecha = new Date(this.fechaSeleccionadaDate);
    fecha.setHours(0, 0, 0, 0);
    this.fechaSeleccionada = fecha
  }

  seleccionar() {
    this.modalController.dismiss({
      fechaSeleccionadaDate: this.fechaSeleccionadaDate,
      fechaSeleccionada: this.fechaSeleccionada
    }, 'fechaSeleccionada')
  }
}
