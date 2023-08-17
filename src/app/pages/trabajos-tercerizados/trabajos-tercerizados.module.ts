import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TrabajosTercerizadosPageRoutingModule } from './trabajos-tercerizados-routing.module';

import { TrabajosTercerizadosPage } from './trabajos-tercerizados.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormAltaTrabajoTercerizadoComponent } from 'src/app/components/forms/form-alta-trabajo-tercerizado/form-alta-trabajo-tercerizado.component';
import { DetalleTrabajoTercerizadoComponent } from 'src/app/components/views/detalle-trabajo-tercerizado/detalle-trabajo-tercerizado.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TrabajosTercerizadosPageRoutingModule,SharedModule
  ],
  declarations: [TrabajosTercerizadosPage,
    FormAltaTrabajoTercerizadoComponent,
  DetalleTrabajoTercerizadoComponent]
})
export class TrabajosTercerizadosPageModule {}
