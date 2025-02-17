import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListaTapasPage } from './lista-tapas.page';

const routes: Routes = [
  {
    path: '',
    component: ListaTapasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListaTapasPageRoutingModule {}
