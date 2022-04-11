import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClasicToolbarComponent } from '../components/shared/clasic-toolbar/clasic-toolbar.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CargarCorreoComponent } from '../components/cargar-correo/cargar-correo.component';
import { IonicModule } from '@ionic/angular';


@NgModule({
  declarations: [
    ClasicToolbarComponent,
    CargarCorreoComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule
  ],
  exports:[
    ClasicToolbarComponent,
    RouterModule,
    ReactiveFormsModule,
    IonicModule
  ]
})
export class SharedModule { }
