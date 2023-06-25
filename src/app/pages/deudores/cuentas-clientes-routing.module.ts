import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CuentasClientesPage } from './cuentas-clientes.page';

const routes: Routes = [
  {
    path: '',
    component: CuentasClientesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CuentasClientesPageRoutingModule {}
