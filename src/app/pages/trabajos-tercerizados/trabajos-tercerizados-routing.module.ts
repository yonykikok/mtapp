import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TrabajosTercerizadosPage } from './trabajos-tercerizados.page';

const routes: Routes = [
  {
    path: '',
    component: TrabajosTercerizadosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrabajosTercerizadosPageRoutingModule {}
