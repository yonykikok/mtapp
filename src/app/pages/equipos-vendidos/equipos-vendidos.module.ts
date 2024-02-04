import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EquiposVendidosPageRoutingModule } from './equipos-vendidos-routing.module';

import { EquiposVendidosPage } from './equipos-vendidos.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { VisualizadorDeImagenComponent } from 'src/app/components/views/visualizador-de-imagen/visualizador-de-imagen.component';
import { FormEquipoVendidoComponent } from 'src/app/components/forms/form-equipo-vendido/form-equipo-vendido.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EquiposVendidosPageRoutingModule,
    SharedModule
  ],
  declarations: [EquiposVendidosPage,VisualizadorDeImagenComponent,FormEquipoVendidoComponent]
})
export class EquiposVendidosPageModule {}
