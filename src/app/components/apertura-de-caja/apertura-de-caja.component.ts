import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { LibroDiario } from 'src/app/clases/libro-diario';
import { AlertService } from 'src/app/services/alert.service';
import { DataBaseService } from 'src/app/services/database.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-apertura-de-caja',
  templateUrl: './apertura-de-caja.component.html',
  styleUrls: ['./apertura-de-caja.component.scss'],
})
export class AperturaDeCajaComponent implements OnInit {
  montoIngresado: number = 0;
  montoInicialOriginal: number = 0;
  libroDiarioHoy!: LibroDiario;

  constructor(private alertService:AlertService,
    private database:DataBaseService,
    private modalController:ModalController,
    private spinnerService:SpinnerService) { }

  ngOnInit() { }

  showConfirmDialog() {
    this.alertService.alertConfirmacion('Confirmación', `La caja inicial es: $${this.montoIngresado}?`, 'Si, confirmo', this.cargarMontoInicial.bind(this));
  }
  async cargarMontoInicial() {
    this.modalController.dismiss(this.montoIngresado,'guardar')

  }


}
