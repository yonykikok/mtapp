import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Glass } from 'src/app/clases/glass';
import { AlertService } from 'src/app/services/alert.service';
import { FuncionesUtilesService } from 'src/app/services/funciones-utiles.service';
import { SelectorDeModelosCompatiblesComponent } from '../../selector-de-modelos-compatibles/selector-de-modelos-compatibles.component';

@Component({
  selector: 'app-detalle-glass',
  templateUrl: './detalle-glass.component.html',
  styleUrls: ['./detalle-glass.component.scss'],
})
export class DetalleGlassComponent implements OnInit {
  repuesto!: Glass;
  ruta!: string;
  clonRepuesto!: Glass;
  glassesCargados!: Glass[];
  constructor(private funcionesUtilesService: FuncionesUtilesService,
    private modalController: ModalController,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.clonRepuesto = this.funcionesUtilesService.clonarObjeto(this.repuesto);
  }


  modificarGlass() {

  }

  guardarCambios() {

  }
  eliminarGlass() {
    this.alertService.alertConfirmacion('Confirmación', 'Seguro de quitar este elemento de la lista?', 'Si', () => {
      this.repuesto = this.funcionesUtilesService.clonarObjeto(this.clonRepuesto);
      this.modalController.dismiss(this.repuesto, 'borrar');
    })
  }

  async abrirSelectorDeModelos() {
    let modal = await this.modalController.create({
      component: SelectorDeModelosCompatiblesComponent,
      componentProps: {
        modelosSeleccionados: this.repuesto.compatibilidad,
        lista: this.glassesCargados.map(glass => {
          return {
            marca: glass.marca,
            modelo: glass.modelo,
            id: glass.id,
          }
        })
      }
    });

    modal.onDidDismiss().then((result) => {

      if (result.data) {
        switch (result.role) {
          case "seleccionTerminada":
            this.repuesto.compatibilidad = [...result.data];
            break;
        }
      }
    })
    modal.present();

  }
}
