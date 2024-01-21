import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
// import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';
import { Barcode, BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-barcode-scanner',
  templateUrl: './barcode-scanner.component.html',
  styleUrls: ['./barcode-scanner.component.scss'],
})
export class BarcodeScannerComponent implements OnInit {
  isSupported = false;
  barcodes: Barcode[] = [];

  constructor(private alertController: AlertController) {}

  ngOnInit() {
    BarcodeScanner.isSupported().then((result:any) => {
      this.isSupported = result.supported;
    });
  }

  async scan(): Promise<void> {
    const granted = await this.requestPermissions();
    if (!granted) {
      this.presentAlert();
      return;
    }
    const { barcodes } = await BarcodeScanner.scan();
    this.barcodes.push(...barcodes);
  }

  async requestPermissions(): Promise<boolean> {
    const { camera } = await BarcodeScanner.requestPermissions();
    return camera === 'granted' || camera === 'limited';
  }

  async presentAlert(): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Permission denied',
      message: 'Please grant camera permission to use the barcode scanner.',
      buttons: ['OK'],
    });
    await alert.present();
  }
}
//   @Input() formats: string = "QR_CODE,PDF_417";
//   @Output() scannerResultEvent = new EventEmitter<any>();


//   constructor(
//     private barcodeScanner: BarcodeScanner,
//     private modalRef: ModalController
//   ) { }

//   ngOnInit() {

//   }



  
//   abrirScanner() {
//     let options = {
//       formats: this.formats ? this.formats : "QR_CODE,PDF_417"
//     }

//     this.barcodeScanner.scan(options).then((barcodeData: any) => {
//       // this.scannerResultEvent.emit(barcodeData);
//       this.modalRef.dismiss(barcodeData);
//     }).catch((err: Error) => {
//       console.error('Error', err);
//     });

//   }
//   cerrarScanner() {
//     this.modalRef.dismiss();
//   }
