import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListaProductosPageRoutingModule } from './lista-productos-routing.module';

import { ListaProductosPage } from './lista-productos.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormImpuestosProductoComponent } from 'src/app/components/forms/form-impuestos-producto/form-impuestos-producto.component';
import { FormAumentoPorcentualComponent } from 'src/app/components/forms/form-aumento-porcentual/form-aumento-porcentual.component';
import { ActualizadorDePrecioProductoComponent } from 'src/app/components/actualizador-de-precio-producto/actualizador-de-precio-producto.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListaProductosPageRoutingModule,
    SharedModule
  ],
  declarations: [ListaProductosPage,
    FormImpuestosProductoComponent, FormAumentoPorcentualComponent,
    ActualizadorDePrecioProductoComponent
  ]
})
export class ListaProductosPageModule { }
