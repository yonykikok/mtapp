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

@NgModule({
  declarations: [
    ClasicToolbarComponent,
    CustomIonSlidingComponent,
    EstadoReparacionPipe,
    EstadoReparacionColorDirective, 
    EstadoReparacionBgcolorDirective, 
    EstadoReparacionBorderColorDirective
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
    EstadoReparacionBorderColorDirective

  ]
})
export class SharedModule {
 
}
