import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DashboardPageRoutingModule } from './dashboard-routing.module';

import { DashboardPage } from './dashboard.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { ControlDeHorasTrabajadasComponent } from 'src/app/components/control-de-horas-trabajadas/control-de-horas-trabajadas.component';
import { NuevaFuncionalidadComponent } from 'src/app/components/nueva-funcionalidad/nueva-funcionalidad.component';
import { CambiarStockProductoComponent } from 'src/app/components/cambiar-stock-producto/cambiar-stock-producto.component';
import { PatronDeBloqueoComponent } from 'src/app/components/patron-de-bloqueo/patron-de-bloqueo.component';
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
    NuevaFuncionalidadComponent,
    CambiarStockProductoComponent,
    PatronDeBloqueoComponent
  ],
  providers: [
  ]
})
export class DashboardPageModule { }
