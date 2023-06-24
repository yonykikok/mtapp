import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StockModulosPageRoutingModule } from './stock-modulos-routing.module';

import { StockModulosPage } from './stock-modulos.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormStockModuloComponent } from 'src/app/components/forms/form-stock-modulo/form-stock-modulo.component';
import { DetalleStockModuloComponent } from 'src/app/components/detalle-stock-modulo/detalle-stock-modulo.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StockModulosPageRoutingModule,
    SharedModule
  ],
  declarations: [StockModulosPage, FormStockModuloComponent,DetalleStockModuloComponent]
})
export class StockModulosPageModule {}
