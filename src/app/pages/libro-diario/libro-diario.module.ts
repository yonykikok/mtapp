import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LibroDiarioPageRoutingModule } from './libro-diario-routing.module';

import { LibroDiarioPage } from './libro-diario.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LibroDiarioPageRoutingModule
  ],
  declarations: [LibroDiarioPage]
})
export class LibroDiarioPageModule {}
