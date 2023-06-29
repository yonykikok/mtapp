import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BoletasPage } from './boletas.page';

const routes: Routes = [
  {
    path: '',
    component: BoletasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BoletasPageRoutingModule {}
