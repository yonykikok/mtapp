import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListaGlassPage } from './lista-glass.page';

const routes: Routes = [
  {
    path: '',
    component: ListaGlassPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListaGlassPageRoutingModule {}
