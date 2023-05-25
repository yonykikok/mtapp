import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListaFlexDeCargaPageRoutingModule } from './lista-flex-de-carga-routing.module';

import { ListaFlexDeCargaPage } from './lista-flex-de-carga.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListaFlexDeCargaPageRoutingModule
  ],
  declarations: [ListaFlexDeCargaPage]
})
export class ListaFlexDeCargaPageModule {}
