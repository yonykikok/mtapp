import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EquiposDisponiblesNewPage } from './equipos-disponibles-new.page';

const routes: Routes = [
  {
    path: '',
    component: EquiposDisponiblesNewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EquiposDisponiblesNewPageRoutingModule {}
