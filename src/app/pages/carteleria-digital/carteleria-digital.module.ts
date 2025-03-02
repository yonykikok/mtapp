import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CarteleriaDigitalPageRoutingModule } from './carteleria-digital-routing.module';

import { CarteleriaDigitalPage } from './carteleria-digital.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CarteleriaDigitalPageRoutingModule,
    SharedModule
  ],
  declarations: [CarteleriaDigitalPage]
})
export class CarteleriaDigitalPageModule {}
