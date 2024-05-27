import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListaProductosPageRoutingModule } from './lista-productos-routing.module';

import { ListaProductosPage } from './lista-productos.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListaProductosPageRoutingModule,
    SharedModule
  ],
  declarations: [ListaProductosPage]
})
export class ListaProductosPageModule {}
