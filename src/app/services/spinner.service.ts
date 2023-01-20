import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  constructor(private loadingCtrl: LoadingController) { }


  async showLoading(message) {
    let loading = await this.loadingCtrl.create({
      message,
      mode: 'ios',
      spinner: 'bubbles',
    });
    loading.present();
  }

  async stopLoading() {
    let loading = await this.loadingCtrl.getTop();
    if (loading) {
      this.loadingCtrl.dismiss();
    }
  }


}
