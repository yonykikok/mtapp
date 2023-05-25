import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListaBateriasPageRoutingModule } from './lista-baterias-routing.module';

import { ListaBateriasPage } from './lista-baterias.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListaBateriasPageRoutingModule
  ],
  declarations: [ListaBateriasPage]
})
export class ListaBateriasPageModule {}
