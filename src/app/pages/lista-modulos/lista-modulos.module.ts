import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListaModulosPageRoutingModule } from './lista-modulos-routing.module';

import { ListaModulosPage } from './lista-modulos.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { DetalleModuloComponent } from 'src/app/components/views/detalle-modulo/detalle-modulo.component';
import { FormModuloComponent } from 'src/app/components/forms/form-modulo/form-modulo.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListaModulosPageRoutingModule,
    SharedModule,
  ],
  declarations: [ListaModulosPage,DetalleModuloComponent,FormModuloComponent]
})
export class ListaModulosPageModule {}
