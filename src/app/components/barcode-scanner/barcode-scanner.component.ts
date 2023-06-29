import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-barcode-scanner',
  templateUrl: './barcode-scanner.component.html',
  styleUrls: ['./barcode-scanner.component.scss'],
})
export class BarcodeScannerComponent implements OnInit {
  @Input() formats;
  @Output() scannerResultEvent = new EventEmitter<any>();


  constructor(
    private barcodeScanner: BarcodeScanner,
    private modalRef: ModalController
  ) { }

  ngOnInit() {

  }
  abrirScanner() {
    let options = {
      formats: this.formats ? this.formats : "QR_CODE,PDF_417"
    }

    this.barcodeScanner.scan(options).then(barcodeData => {
      // this.scannerResultEvent.emit(barcodeData);
      this.modalRef.dismiss(barcodeData);
    }).catch(err => {
      console.error('Error', err);
    });

  }
  cerrarScanner() {
    this.modalRef.dismiss();
  }
}
