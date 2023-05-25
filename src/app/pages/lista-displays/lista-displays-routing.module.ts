import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListaDisplaysPage } from './lista-displays.page';

const routes: Routes = [
  {
    path: '',
    component: ListaDisplaysPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListaDisplaysPageRoutingModule {}
