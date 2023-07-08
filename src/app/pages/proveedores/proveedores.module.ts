import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProveedoresPageRoutingModule } from './proveedores-routing.module';

import { ProveedoresPage } from './proveedores.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormAltaProveedorComponent } from 'src/app/components/forms/form-alta-proveedor/form-alta-proveedor.component';
import { DetalleProveedorComponent } from 'src/app/components/views/detalle-proveedor/detalle-proveedor.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProveedoresPageRoutingModule,
    SharedModule
  ],
  declarations: [
    ProveedoresPage,
    FormAltaProveedorComponent, DetalleProveedorComponent]
})
export class ProveedoresPageModule { }
