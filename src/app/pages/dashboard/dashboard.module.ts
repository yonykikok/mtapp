import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DashboardPageRoutingModule } from './dashboard-routing.module';

import { DashboardPage } from './dashboard.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { ControlDeHorasTrabajadasComponent } from 'src/app/components/control-de-horas-trabajadas/control-de-horas-trabajadas.component';
import { NuevaFuncionalidadComponent } from 'src/app/components/nueva-funcionalidad/nueva-funcionalidad.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DashboardPageRoutingModule,
    SharedModule,
  ],
  declarations: [DashboardPage,
    ControlDeHorasTrabajadasComponent,
    NuevaFuncionalidadComponent

  ],
  providers: [
  ]
})
export class DashboardPageModule { }
