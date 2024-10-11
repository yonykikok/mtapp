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
  barcodeTitle: string = '';
  codigo!: string;


  constructor(private funcionesUtilesService: FuncionesUtilesService,
    private modalController: ModalController
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
    const canvas = this.barcode.nativeElement;

    JsBarcode(canvas, text, {
      format: 'CODE128',
      lineColor: '#000000',
      displayValue: true,   // Mostrar el valor del código de barras debajo del código
      text: text,           // Texto a mostrar debajo del código de barras
      textAlign: 'center',  // Alinear el texto en el centro del código
      fontOptions: 'bold  ',  // Opciones de fuente (negrita en este caso)
      marginTop: 20,        // Añadir margen superior para el título
      marginBottom: 20      // Añadir margen inferior para espacio adicional
    });

    // Para agregar un título en la parte superior, usamos el contexto de canvas
    const ctx = canvas.getContext('2d');
    ctx.font = '10px Arial';
    ctx.textAlign = 'right';  // Alinea el texto a la izquierda
    this.barcodeTitle = this.barcodeTitle.trim();  // Elimina espacios iniciales o finales
    ctx.fillText(this.barcodeTitle, 0, 10);
    
  }

  // generateBarcode(text: string) {
  //   JsBarcode(this.barcode.nativeElement, text, {
  //     format: 'CODE128',
  //     lineColor: '#000000',
  //     width: 2,
  //     height: 100,
  //     displayValue: true
  //   });
  // }
  generarCodigo() {
    this.barcodeText = this.funcionesUtilesService.generateBarcodeValue();
    this.generateBarcode(this.barcodeText);
  }

  guardarCodigo() {
    this.modalController.dismiss(this.barcodeText, 'Guardar Codigo')
  }
}
