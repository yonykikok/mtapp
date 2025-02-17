import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListaTapasPageRoutingModule } from './lista-tapas-routing.module';

import { ListaTapasPage } from './lista-tapas.page';
import { SharedModule } from "../../shared/shared.module";
import { FormTapaComponent } from 'src/app/components/forms/form-tapa/form-tapa.component';
import { DetalleTapaComponent } from 'src/app/components/detalle-tapa/detalle-tapa.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListaTapasPageRoutingModule,
    SharedModule
],
  declarations: [ListaTapasPage,FormTapaComponent,DetalleTapaComponent],
  exports:[ListaTapasPage]
})
export class ListaTapasPageModule {}
