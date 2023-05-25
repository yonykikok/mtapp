import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LibroDiarioPage } from './libro-diario.page';

const routes: Routes = [
  {
    path: '',
    component: LibroDiarioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LibroDiarioPageRoutingModule {}
