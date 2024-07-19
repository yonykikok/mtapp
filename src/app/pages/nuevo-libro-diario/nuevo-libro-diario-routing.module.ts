import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NuevoLibroDiarioPage } from './nuevo-libro-diario.page';

const routes: Routes = [
  {
    path: '',
    component: NuevoLibroDiarioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NuevoLibroDiarioPageRoutingModule {}
