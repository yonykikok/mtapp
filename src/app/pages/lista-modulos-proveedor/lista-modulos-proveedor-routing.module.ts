import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListaModulosProveedorPage } from './lista-modulos-proveedor.page';

const routes: Routes = [
  {
    path: '',
    component: ListaModulosProveedorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListaModulosProveedorPageRoutingModule {}
