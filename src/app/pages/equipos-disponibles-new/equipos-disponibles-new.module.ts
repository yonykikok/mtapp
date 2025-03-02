import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EquiposDisponiblesNewPageRoutingModule } from './equipos-disponibles-new-routing.module';

import { EquiposDisponiblesNewPage } from './equipos-disponibles-new.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { JoinPipe } from 'src/app/pipes/join.pipe';
import { FilterPipe } from 'src/app/pipes/filter.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EquiposDisponiblesNewPageRoutingModule,
    SharedModule,
  ],
  declarations: [EquiposDisponiblesNewPage,
    JoinPipe,
    FilterPipe

  ]
})
export class EquiposDisponiblesNewPageModule {}
