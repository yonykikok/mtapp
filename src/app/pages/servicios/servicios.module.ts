import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ServiciosPageRoutingModule } from './servicios-routing.module';

import { ServiciosPage } from './servicios.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormAltaServicioComponent } from 'src/app/components/forms/form-alta-servicio/form-alta-servicio.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ServiciosPageRoutingModule,
    SharedModule
  ],
  declarations: [ServiciosPage,
    FormAltaServicioComponent],
  exports: [ServiciosPage]

})
export class ServiciosPageModule { }
