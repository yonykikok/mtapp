import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DeudoresPageRoutingModule } from './deudores-routing.module';

import { DeudoresPage } from './deudores.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DeudoresPageRoutingModule
  ],
  declarations: [DeudoresPage]
})
export class DeudoresPageModule {}
