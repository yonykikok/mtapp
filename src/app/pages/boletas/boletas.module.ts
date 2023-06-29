import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BoletasPageRoutingModule } from './boletas-routing.module';

import { BoletasPage } from './boletas.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BoletasPageRoutingModule,
    SharedModule
  ],
  declarations: [BoletasPage]
})
export class BoletasPageModule {}
