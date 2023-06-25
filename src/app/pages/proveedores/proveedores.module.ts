import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProveedoresPageRoutingModule } from './proveedores-routing.module';

import { ProveedoresPage } from './proveedores.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProveedoresPageRoutingModule,
    SharedModule
  ],
  declarations: [ProveedoresPage]
})
export class ProveedoresPageModule {}
