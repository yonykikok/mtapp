import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AjustesDeRepuestosPageRoutingModule } from './ajustes-de-repuestos-routing.module';

import { AjustesDeRepuestosPage } from './ajustes-de-repuestos.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AjustesDeRepuestosPageRoutingModule,
    SharedModule
  ],
  declarations: [AjustesDeRepuestosPage]
})
export class AjustesDeRepuestosPageModule {}
