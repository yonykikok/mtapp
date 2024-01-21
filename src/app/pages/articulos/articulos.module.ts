import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ArticulosPageRoutingModule } from './articulos-routing.module';

import { ArticulosPage } from './articulos.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormAltaArticuloComponent } from 'src/app/components/forms/articulos/form-alta-articulo/form-alta-articulo.component';
import { FormAltaCargadorComponent } from 'src/app/components/forms/articulos/form-alta-cargador/form-alta-cargador.component';
import { FormAltaJoystickComponent } from 'src/app/components/forms/articulos/form-alta-joystick/form-alta-joystick.component';
import { FormAltaAuricularComponent } from 'src/app/components/forms/articulos/form-alta-auricular/form-alta-auricular.component';
import { FormAltaFundaComponent } from 'src/app/components/forms/articulos/form-alta-funda/form-alta-funda.component';
import { FormAltaCableComponent } from 'src/app/components/forms/articulos/form-alta-cable/form-alta-cable.component';
import { FormAltaProtectorPantallaComponent } from 'src/app/components/forms/articulos/form-alta-protector-pantalla/form-alta-protector-pantalla.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ArticulosPageRoutingModule,
    SharedModule
  ],
  declarations: [ArticulosPage,
    FormAltaArticuloComponent,
    FormAltaCargadorComponent,
    FormAltaJoystickComponent,
    FormAltaAuricularComponent,
    FormAltaFundaComponent,
    FormAltaCableComponent,
    FormAltaProtectorPantallaComponent
  ]
})
export class ArticulosPageModule { }
