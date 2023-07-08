import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TrabajosTercerizadosPageRoutingModule } from './trabajos-tercerizados-routing.module';

import { TrabajosTercerizadosPage } from './trabajos-tercerizados.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TrabajosTercerizadosPageRoutingModule,SharedModule
  ],
  declarations: [TrabajosTercerizadosPage]
})
export class TrabajosTercerizadosPageModule {}
