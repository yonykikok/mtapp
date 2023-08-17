import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListaDeUsuariosPageRoutingModule } from './lista-de-usuarios-routing.module';

import { ListaDeUsuariosPage } from './lista-de-usuarios.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { DetalleUsuarioComponent } from 'src/app/components/views/detalle-usuario/detalle-usuario.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListaDeUsuariosPageRoutingModule,
    SharedModule
  ],
  declarations: [ListaDeUsuariosPage,DetalleUsuarioComponent]
})
export class ListaDeUsuariosPageModule {}
