import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
// import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';
import { Barcode, BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { AlertController, ModalController } from '@ionic/angular';
import { ToastColor, ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-barcode-scanner',
  templateUrl: './barcode-scanner.component.html',
  styleUrls: ['./barcode-scanner.component.scss'],
})
export class BarcodeScannerComponent implements OnInit {
  isSupported = false;
  barcodes: Barcode[] = [];
  barcodeFormGroup = new FormGroup({
    codigo: new FormControl('', [Validators.minLength(12), Validators.maxLength(13), Validators.pattern('^[0-9]*$')])
  });


  constructor(private alertController: AlertController,
    public modalController: ModalController,
    private toastService: ToastService) { }

  ngOnInit() {
    BarcodeScanner.isSupported().then((result) => {
      console.log(result)
      this.isSupported = result.supported;
    }, (err) => {
      this.isSupported = false;
      // this.toastService.simpleMessage('Lector no soportado', 'El lector no esta soportado en esta plataforma', ToastColor.warning);
      console.log(err)
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