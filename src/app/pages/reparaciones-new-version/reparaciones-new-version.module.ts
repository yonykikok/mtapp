import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReparacionesNewVersionPageRoutingModule } from './reparaciones-new-version-routing.module';

import { ReparacionesNewVersionPage } from './reparaciones-new-version.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { ListaModulosPage } from '../lista-modulos/lista-modulos.page';
import { ListaModulosPageModule } from '../lista-modulos/lista-modulos.module';
import { ListaFlexDeCargaPageModule } from '../lista-flex-de-carga/lista-flex-de-carga.module';
import { ListaBateriasPageModule } from '../lista-baterias/lista-baterias.module';
import { ListaGlassPageModule } from '../lista-glass/lista-glass.module';
import { ServiciosPageModule } from '../servicios/servicios.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReparacionesNewVersionPageRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    ListaModulosPageModule,
    ListaFlexDeCargaPageModule,
    ListaBateriasPageModule,
    ListaGlassPageModule,
    ServiciosPageModule
  ],
  declarations: [ReparacionesNewVersionPage]
})
export class ReparacionesNewVersionPageModule {}
