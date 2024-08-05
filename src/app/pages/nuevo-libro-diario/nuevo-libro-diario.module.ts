import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NuevoLibroDiarioPageRoutingModule } from './nuevo-libro-diario-routing.module';

import { NuevoLibroDiarioPage } from './nuevo-libro-diario.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { NuevoFormDetalleVentaComponent } from 'src/app/components/nuevo-form-detalle-venta/nuevo-form-detalle-venta.component';
import { CarritoComponent } from 'src/app/components/carrito/carrito.component';
import { FormasDePagoComponent } from 'src/app/components/formas-de-pago/formas-de-pago.component';
import { ItemFueraDelSistemaModalComponent } from 'src/app/components/item-fuera-del-sistema-modal/item-fuera-del-sistema-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NuevoLibroDiarioPageRoutingModule,
    SharedModule,
  ],
  declarations: [NuevoLibroDiarioPage,
    NuevoFormDetalleVentaComponent,
    CarritoComponent,
    FormasDePagoComponent,
    ItemFueraDelSistemaModalComponent

  ]
})
export class NuevoLibroDiarioPageModule {}
