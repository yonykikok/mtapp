import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HistorialCajaPage } from './historial-caja.page';

const routes: Routes = [
  {
    path: '',
    component: HistorialCajaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HistorialCajaPageRoutingModule {}
