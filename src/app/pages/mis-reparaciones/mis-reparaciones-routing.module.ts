import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MisReparacionesPage } from './mis-reparaciones.page';

const routes: Routes = [
  {
    path: '',
    component: MisReparacionesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MisReparacionesPageRoutingModule {}
