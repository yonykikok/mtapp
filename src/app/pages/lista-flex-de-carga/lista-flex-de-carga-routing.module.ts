import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListaFlexDeCargaPage } from './lista-flex-de-carga.page';

const routes: Routes = [
  {
    path: '',
    component: ListaFlexDeCargaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListaFlexDeCargaPageRoutingModule {}
