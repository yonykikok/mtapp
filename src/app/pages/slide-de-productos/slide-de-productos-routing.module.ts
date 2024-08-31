import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SlideDeProductosPage } from './slide-de-productos.page';

const routes: Routes = [
  {
    path: '',
    component: SlideDeProductosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SlideDeProductosPageRoutingModule {}
