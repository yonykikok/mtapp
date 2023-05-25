import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListaDisplaysPageRoutingModule } from './lista-displays-routing.module';

import { ListaDisplaysPage } from './lista-displays.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListaDisplaysPageRoutingModule
  ],
  declarations: [ListaDisplaysPage]
})
export class ListaDisplaysPageModule {}
