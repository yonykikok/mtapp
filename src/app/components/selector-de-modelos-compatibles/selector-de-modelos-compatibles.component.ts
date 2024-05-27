import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-selector-de-modelos-compatibles',
  templateUrl: './selector-de-modelos-compatibles.component.html',
  styleUrls: ['./selector-de-modelos-compatibles.component.scss'],
})
export class SelectorDeModelosCompatiblesComponent implements OnInit {
  textoABuscar: string = '';
  lista: { marca: string, modelo: string, id: string, checked: boolean }[] = [];
  modelosSeleccionados: any[] = [];
  constructor(private alertService: AlertService,
    private modalController: ModalController) { }

  ngOnInit() {
    this.lista.forEach(item => {
      if (this.modelosSeleccionados.some(modelo => modelo.id === item.id)) {
        item.checked = true;
      }
    });
  }

  seleccionarModelo(event: Event, item: any) {
    event.stopPropagation();
    let indexABorrar = this.modelosSeleccionados.findIndex(mod => item.id == mod.id);
    if (indexABorrar == -1) {
      this.modelosSeleccionados.push(item);
    } else {
      this.modelosSeleccionados.splice(indexABorrar, 1);
    }
  }

  onChangeFilter() {

  }
  
  mostrarConfirmacion() {
    this.alertService.alertConfirmacion('Confirmación', "¿Termino de seleccionar todos los compatibles?", 'Sí', () => {
      this.modalController.dismiss(this.modelosSeleccionados, 'seleccionTerminada');
    })
  }
}
