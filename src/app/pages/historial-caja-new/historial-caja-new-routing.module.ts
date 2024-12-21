import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HistorialCajaNewPage } from './historial-caja-new.page';

const routes: Routes = [
  {
    path: '',
    component: HistorialCajaNewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HistorialCajaNewPageRoutingModule {}
