import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EquiposDisponiblesPageRoutingModule } from './equipos-disponibles-routing.module';

import { EquiposDisponiblesPage } from './equipos-disponibles.page';
import { FormEquipoDisponibleComponent } from 'src/app/components/forms/form-equipo-disponible/form-equipo-disponible.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EquiposDisponiblesPageRoutingModule,
    SharedModule
  ],
  declarations: [EquiposDisponiblesPage,
    FormEquipoDisponibleComponent
  ]
})
export class EquiposDisponiblesPageModule { }
