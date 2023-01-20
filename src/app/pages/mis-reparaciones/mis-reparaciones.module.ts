import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MisReparacionesPageRoutingModule } from './mis-reparaciones-routing.module';

import { MisReparacionesPage } from './mis-reparaciones.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormAltaReparacionComponent } from 'src/app/components/forms/form-alta-reparacion/form-alta-reparacion.component';
import { DetalleReparacionComponent } from 'src/app/components/detalles/detalle-reparacion/detalle-reparacion.component';
import { EstadoReparacionPipe } from 'src/app/pipes/estado-reparacion.pipe';
import { EstadoReparacionColorDirective } from 'src/app/directives/estado-reparacion-color.directive';
import { EstadoReparacionBgcolorDirective } from 'src/app/directives/estado-reparacion-bgcolor.directive';
import { EstadoReparacionBorderColorDirective } from 'src/app/directives/estado-reparacion-border-color.directive';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MisReparacionesPageRoutingModule,
    SharedModule
  ],
  declarations: [MisReparacionesPage,
    FormAltaReparacionComponent,
    DetalleReparacionComponent]
})
export class MisReparacionesPageModule { }
