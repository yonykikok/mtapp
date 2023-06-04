import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListaFlexDeCargaPageRoutingModule } from './lista-flex-de-carga-routing.module';

import { ListaFlexDeCargaPage } from './lista-flex-de-carga.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormFlexDeCargaComponent } from 'src/app/components/forms/form-flex-de-carga/form-flex-de-carga.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListaFlexDeCargaPageRoutingModule,
    SharedModule
  ],
  declarations: [ListaFlexDeCargaPage,FormFlexDeCargaComponent]
})
export class ListaFlexDeCargaPageModule {}
