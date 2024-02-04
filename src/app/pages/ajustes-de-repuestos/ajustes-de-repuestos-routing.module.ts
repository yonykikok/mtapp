import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AjustesDeRepuestosPage } from './ajustes-de-repuestos.page';

const routes: Routes = [
  {
    path: '',
    component: AjustesDeRepuestosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AjustesDeRepuestosPageRoutingModule {}
