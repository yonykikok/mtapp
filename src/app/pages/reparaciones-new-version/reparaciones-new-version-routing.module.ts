import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReparacionesNewVersionPage } from './reparaciones-new-version.page';

const routes: Routes = [
  {
    path: '',
    component: ReparacionesNewVersionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReparacionesNewVersionPageRoutingModule {}
