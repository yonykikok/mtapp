import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HistorialCajaPageRoutingModule } from './historial-caja-routing.module';

import { HistorialCajaPage } from './historial-caja.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HistorialCajaPageRoutingModule
  ],
  declarations: [HistorialCajaPage]
})
export class HistorialCajaPageModule {}
