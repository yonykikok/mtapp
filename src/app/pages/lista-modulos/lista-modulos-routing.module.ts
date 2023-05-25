import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListaModulosPage } from './lista-modulos.page';

const routes: Routes = [
  {
    path: '',
    component: ListaModulosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListaModulosPageRoutingModule {}
