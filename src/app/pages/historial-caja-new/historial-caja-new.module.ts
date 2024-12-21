import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HistorialCajaNewPageRoutingModule } from './historial-caja-new-routing.module';

import { HistorialCajaNewPage } from './historial-caja-new.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HistorialCajaNewPageRoutingModule,
    SharedModule
  ],
  declarations: [HistorialCajaNewPage]
})
export class HistorialCajaNewPageModule {}
