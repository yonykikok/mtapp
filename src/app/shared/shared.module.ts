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
import { EncuestaCalificacionComponent } from '../components/encuesta-calificacion/encuesta-calificacion.component';
import { FormAltaProductoComponent } from '../components/forms/form-alta-producto/form-alta-producto.component';
import { CargarCategoriaComponent } from '../components/cargar-categoria/cargar-categoria.component';
import { GeneradorDeCodigosDeBarraComponent } from '../components/generador-de-codigos-de-barra/generador-de-codigos-de-barra.component';
import { RedondearPrecioPipe } from 'src/app/redondear-precio.pipe';
import { SelectorDeProductosComponent } from '../components/selector-de-productos/selector-de-productos.component';
import { ModificadorDeStockRapidoComponent } from '../components/modificador-de-stock-rapido/modificador-de-stock-rapido.component';
import { FormDetallesFinancierosComponent } from '../components/form-detalles-financieros/form-detalles-financieros.component';

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
    FormAltaReparacionComponent,
    EncuestaCalificacionComponent,
    FormAltaProductoComponent,
    CargarCategoriaComponent,
    GeneradorDeCodigosDeBarraComponent,
    RedondearPrecioPipe,
    SelectorDeProductosComponent,
    ModificadorDeStockRapidoComponent,
    FormDetallesFinancierosComponent

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
    FormAltaReparacionComponent,
    EncuestaCalificacionComponent,
    FormAltaProductoComponent,
    CargarCategoriaComponent,
    GeneradorDeCodigosDeBarraComponent,
    RedondearPrecioPipe,
    SelectorDeProductosComponent,
    ModificadorDeStockRapidoComponent,
    FormDetallesFinancierosComponent


  ]
})
export class SharedModule {

}
