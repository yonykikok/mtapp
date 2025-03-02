import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CarteleriaDigitalPage } from './carteleria-digital.page';

const routes: Routes = [
  {
    path: '',
    component: CarteleriaDigitalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CarteleriaDigitalPageRoutingModule {}
