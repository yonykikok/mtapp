import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListaDeUsuariosPage } from './lista-de-usuarios.page';

const routes: Routes = [
  {
    path: '',
    component: ListaDeUsuariosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListaDeUsuariosPageRoutingModule {}
