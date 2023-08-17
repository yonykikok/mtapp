import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListaModulosProveedorPageRoutingModule } from './lista-modulos-proveedor-routing.module';

import { ListaModulosProveedorPage } from './lista-modulos-proveedor.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListaModulosProveedorPageRoutingModule,
    SharedModule
  ],
  declarations: [ListaModulosProveedorPage]
})
export class ListaModulosProveedorPageModule {}
