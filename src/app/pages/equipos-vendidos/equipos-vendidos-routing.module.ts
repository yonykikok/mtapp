import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EquiposVendidosPage } from './equipos-vendidos.page';

const routes: Routes = [
  {
    path: '',
    component: EquiposVendidosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EquiposVendidosPageRoutingModule {}
