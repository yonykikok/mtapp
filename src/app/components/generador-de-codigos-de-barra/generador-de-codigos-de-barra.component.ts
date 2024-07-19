import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ModalController } from '@ionic/angular';
import JsBarcode from 'jsbarcode';
import { FuncionesUtilesService } from 'src/app/services/funciones-utiles.service';

@Component({
  selector: 'app-generador-de-codigos-de-barra',
  templateUrl: './generador-de-codigos-de-barra.component.html',
  styleUrls: ['./generador-de-codigos-de-barra.component.scss'],
})
export class GeneradorDeCodigosDeBarraComponent implements OnInit {

  @ViewChild('barcode', { static: true }) barcode!: ElementRef;
  barcodeText: string = '';
  codigo!: string;


  constructor(private funcionesUtilesService: FuncionesUtilesService,
    private modalController:ModalController
  ) { }

  ionViewWillEnter() {
    if (this.codigo) {
      this.barcodeText = this.codigo;
      this.generateBarcode(this.barcodeText);
    }
  }
  ngOnInit() {
    this.generateBarcode(this.barcodeText);
  }

  generateBarcode(text: string) {
    JsBarcode(this.barcode.nativeElement, text, {
      format: 'CODE128',
      lineColor: '#000000',
      width: 2,
      height: 100,
      displayValue: true
    });
  }
  generarCodigo() {
    this.barcodeText = this.funcionesUtilesService.generateBarcodeValue();
    this.generateBarcode(this.barcodeText);
  }

  guardarCodigo(){
    this.modalController.dismiss(this.barcodeText,'Guardar Codigo')
  }
}
