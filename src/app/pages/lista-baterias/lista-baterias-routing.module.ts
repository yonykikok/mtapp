import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListaBateriasPage } from './lista-baterias.page';

const routes: Routes = [
  {
    path: '',
    component: ListaBateriasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListaBateriasPageRoutingModule {}
