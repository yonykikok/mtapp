import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
// import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';
import { NgxImageCompressService } from "ngx-image-compress";
import { ServiceWorkerModule } from '@angular/service-worker';
// import { ServiceWorkerModule } from '@angular/service-worker';

@NgModule({
  declarations: [AppComponent],
  // entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot({
      innerHTMLTemplatesEnabled: true
    }),
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    // ServiceWorkerModule.register('ngsw-worker.js', {
    //   enabled: environment.production,
    //   // Register the ServiceWorker as soon as the application is stable
    //   // or after 30 seconds (whichever comes first).
    //   registrationStrategy: 'registerWhenStable:30000'
    // })

  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, 
    // BarcodeScanner, 
    NgxImageCompressService],
  bootstrap: [AppComponent],
})
export class AppModule { }
