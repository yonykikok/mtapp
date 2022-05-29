import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MiCuentaPageRoutingModule } from './mi-cuenta-routing.module';

import { MiCuentaPage } from './mi-cuenta.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { CargarCorreoComponent } from 'src/app/components/cargar-correo/cargar-correo.component';
import { CargarTelefonoComponent } from 'src/app/components/cargar-telefono/cargar-telefono.component';
import { GenerarClaveComponent } from 'src/app/components/generar-clave/generar-clave.component';

@NgModule({

  imports: [
    CommonModule,
    IonicModule,
    MiCuentaPageRoutingModule,
    SharedModule
  ],
  declarations: [MiCuentaPage,
    CargarCorreoComponent,
    CargarTelefonoComponent,
    GenerarClaveComponent]
})
export class MiCuentaPageModule { }
