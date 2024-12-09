import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DashboardNewVersionPageRoutingModule } from './dashboard-new-version-routing.module';

import { DashboardNewVersionPage } from './dashboard-new-version.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DashboardNewVersionPageRoutingModule
  ],
  declarations: [DashboardNewVersionPage]
})
export class DashboardNewVersionPageModule {}
