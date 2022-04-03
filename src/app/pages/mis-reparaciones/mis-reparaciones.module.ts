import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MisReparacionesPageRoutingModule } from './mis-reparaciones-routing.module';

import { MisReparacionesPage } from './mis-reparaciones.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MisReparacionesPageRoutingModule,
    SharedModule
  ],
  declarations: [MisReparacionesPage]
})
export class MisReparacionesPageModule {}
