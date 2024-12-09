import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardNewVersionPage } from './dashboard-new-version.page';

const routes: Routes = [
  {
    path: '',
    component: DashboardNewVersionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardNewVersionPageRoutingModule {}
