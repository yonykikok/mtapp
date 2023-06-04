import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListaBateriasPageRoutingModule } from './lista-baterias-routing.module';

import { ListaBateriasPage } from './lista-baterias.page';
import { FormBateriaComponent } from 'src/app/components/forms/form-bateria/form-bateria.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListaBateriasPageRoutingModule,
    SharedModule
  ],
  declarations: [ListaBateriasPage, FormBateriaComponent]
})
export class ListaBateriasPageModule { }
