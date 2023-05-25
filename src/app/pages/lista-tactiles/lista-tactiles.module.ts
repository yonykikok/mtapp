import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListaTactilesPageRoutingModule } from './lista-tactiles-routing.module';

import { ListaTactilesPage } from './lista-tactiles.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListaTactilesPageRoutingModule
  ],
  declarations: [ListaTactilesPage]
})
export class ListaTactilesPageModule {}
