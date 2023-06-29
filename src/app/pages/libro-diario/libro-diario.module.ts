import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LibroDiarioPageRoutingModule } from './libro-diario-routing.module';

import { LibroDiarioPage } from './libro-diario.page';
import { FormDetalleVentaComponent } from 'src/app/components/forms/form-detalle-venta/form-detalle-venta.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormActualizarItemLibroDiarioComponent } from 'src/app/components/forms/form-actualizar-item-libro-diario/form-actualizar-item-libro-diario.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LibroDiarioPageRoutingModule,
    SharedModule
  ],
  declarations: [LibroDiarioPage,FormDetalleVentaComponent,FormActualizarItemLibroDiarioComponent]
})
export class LibroDiarioPageModule {}
