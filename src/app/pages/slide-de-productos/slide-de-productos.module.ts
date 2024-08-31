import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SlideDeProductosPageRoutingModule } from './slide-de-productos-routing.module';

import { SlideDeProductosPage } from './slide-de-productos.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SlideDeProductosPageRoutingModule,
    SharedModule
  ],
  declarations: [SlideDeProductosPage]
})
export class SlideDeProductosPageModule {}
