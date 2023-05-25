import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EquiposVendidosPageRoutingModule } from './equipos-vendidos-routing.module';

import { EquiposVendidosPage } from './equipos-vendidos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EquiposVendidosPageRoutingModule
  ],
  declarations: [EquiposVendidosPage]
})
export class EquiposVendidosPageModule {}
