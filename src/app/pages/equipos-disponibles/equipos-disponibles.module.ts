import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EquiposDisponiblesPageRoutingModule } from './equipos-disponibles-routing.module';

import { EquiposDisponiblesPage } from './equipos-disponibles.page';
import { FormEquipoDisponibleComponent } from 'src/app/components/forms/form-equipo-disponible/form-equipo-disponible.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormEspecificacionesEquipoComponent } from 'src/app/components/forms/form-especificaciones-equipo/form-especificaciones-equipo.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EquiposDisponiblesPageRoutingModule,
    SharedModule,
  ],
  declarations: [EquiposDisponiblesPage,
    FormEspecificacionesEquipoComponent,
    FormEquipoDisponibleComponent
  ]
})
export class EquiposDisponiblesPageModule { }
