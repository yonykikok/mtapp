import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListaTactilesPage } from './lista-tactiles.page';

const routes: Routes = [
  {
    path: '',
    component: ListaTactilesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListaTactilesPageRoutingModule {}
