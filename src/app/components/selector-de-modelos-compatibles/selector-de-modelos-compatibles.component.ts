import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AlertService } from 'src/app/services/alert.service';
import { FuncionesUtilesService } from 'src/app/services/funciones-utiles.service';

@Component({
  selector: 'app-selector-de-modelos-compatibles',
  templateUrl: './selector-de-modelos-compatibles.component.html',
  styleUrls: ['./selector-de-modelos-compatibles.component.scss'],
})
export class SelectorDeModelosCompatiblesComponent implements OnInit {
  textoABuscar: string = '';
  lista: { marca: string, modelo: string, id: string, checked: boolean }[] = [];
  modelosSeleccionados: any[] = [];
  listaAMostrar: any[] = [];
  constructor(private alertService: AlertService,
    private modalController: ModalController,
    private funcionesUtilesService: FuncionesUtilesService) { }

  ngOnInit() {
    this.lista.forEach(item => {
      if (this.modelosSeleccionados.some(modelo => modelo.id === item.id)) {
        item.checked = true;
      }
    });
    this.listaAMostrar = this.funcionesUtilesService.clonarObjeto(this.lista);
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
    this.listaAMostrar = this.lista.filter((d) => d.modelo.toLowerCase().indexOf(this.textoABuscar) > -1);
  }

  mostrarConfirmacion() {
    this.alertService.alertConfirmacion('Confirmación', "¿Termino de seleccionar todos los compatibles?", 'Sí', () => {
      this.modalController.dismiss(this.modelosSeleccionados, 'seleccionTerminada');
    })
  }
}
