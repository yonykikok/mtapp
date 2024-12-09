import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RepuestosPageRoutingModule } from './repuestos-routing.module';

import { RepuestosPage } from './repuestos.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { ListaModulosPageModule } from '../lista-modulos/lista-modulos.module';
import { ListaBateriasPageModule } from '../lista-baterias/lista-baterias.module';
import { ListaTactilesPageModule } from '../lista-tactiles/lista-tactiles.module';
import { ListaFlexDeCargaPageModule } from '../lista-flex-de-carga/lista-flex-de-carga.module';
import { ListaDisplaysPageModule } from '../lista-displays/lista-displays.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RepuestosPageRoutingModule,
    SharedModule,
    ListaModulosPageModule,
    ListaBateriasPageModule,
    ListaTactilesPageModule,
    ListaFlexDeCargaPageModule,
    ListaDisplaysPageModule
  
  ],
  declarations: [RepuestosPage]
})
export class RepuestosPageModule {}
