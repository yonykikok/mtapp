import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HistorialCajaPageRoutingModule } from './historial-caja-routing.module';

import { HistorialCajaPage } from './historial-caja.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { BusquedaPorTextoComponent } from 'src/app/components/busqueda-por-texto/busqueda-por-texto.component';
import { DetalleVentasDelDiaComponent } from 'src/app/components/detalle-ventas-del-dia/detalle-ventas-del-dia.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HistorialCajaPageRoutingModule,
    SharedModule
  ],
  declarations: [HistorialCajaPage,BusquedaPorTextoComponent,DetalleVentasDelDiaComponent]
})
export class HistorialCajaPageModule {}
