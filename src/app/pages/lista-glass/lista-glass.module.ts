import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListaGlassPageRoutingModule } from './lista-glass-routing.module';

import { ListaGlassPage } from './lista-glass.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormAltaGlassComponent } from 'src/app/components/forms/form-alta-glass/form-alta-glass.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListaGlassPageRoutingModule,
    SharedModule
  ],
  declarations: [ListaGlassPage,
  FormAltaGlassComponent]
})
export class ListaGlassPageModule {}
