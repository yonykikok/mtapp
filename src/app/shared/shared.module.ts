import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClasicToolbarComponent } from '../components/shared/clasic-toolbar/clasic-toolbar.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CustomIonSlidingComponent } from '../components/custom-ion-sliding/custom-ion-sliding.component';
import { EstadoReparacionBorderColorDirective } from '../directives/estado-reparacion-border-color.directive';
import { EstadoReparacionBgcolorDirective } from '../directives/estado-reparacion-bgcolor.directive';
import { EstadoReparacionColorDirective } from '../directives/estado-reparacion-color.directive';
import { EstadoReparacionPipe } from '../pipes/estado-reparacion.pipe';
import { PrecioDolarComponent } from '../components/precio-dolar/precio-dolar.component';
import { ColoresPipe } from '../pipes/colores.pipe';
import { UploadImagesComponent } from '../components/upload-images/upload-images.component';
import { MaxLengthPipe } from '../pipes/max-length.pipe';
import { FormAltaReparacionComponent } from '../components/forms/form-alta-reparacion/form-alta-reparacion.component';

@NgModule({
  declarations: [
    ClasicToolbarComponent,
    CustomIonSlidingComponent,
    EstadoReparacionPipe,
    EstadoReparacionColorDirective,
    EstadoReparacionBgcolorDirective,
    EstadoReparacionBorderColorDirective,
    PrecioDolarComponent,
    ColoresPipe,
    UploadImagesComponent,
    MaxLengthPipe,
    FormAltaReparacionComponent

  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule
  ],
  exports: [
    ClasicToolbarComponent,
    RouterModule,
    ReactiveFormsModule,
    IonicModule,
    CustomIonSlidingComponent,
    EstadoReparacionPipe,
    EstadoReparacionColorDirective,
    EstadoReparacionBgcolorDirective,
    EstadoReparacionBorderColorDirective,
    PrecioDolarComponent,
    UploadImagesComponent,
    MaxLengthPipe,
    ColoresPipe,
    FormAltaReparacionComponent

  ]
})
export class SharedModule {

}
