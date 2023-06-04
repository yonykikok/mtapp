import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListaPedidosPageRoutingModule } from './lista-pedidos-routing.module';

import { ListaPedidosPage } from './lista-pedidos.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { PrioridadPedidoDirective } from 'src/app/directives/prioridad-pedido.directive';
import { DetallePedidoComponent } from 'src/app/components/views/detalle-pedido/detalle-pedido.component';
import { FormPedidoComponent } from 'src/app/components/forms/form-pedido/form-pedido.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListaPedidosPageRoutingModule,
    SharedModule,
  ],
  declarations: [ListaPedidosPage,
    PrioridadPedidoDirective,
    DetallePedidoComponent,
    FormPedidoComponent
  ]
})
export class ListaPedidosPageModule {}
