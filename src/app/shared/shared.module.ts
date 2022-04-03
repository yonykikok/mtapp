import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClasicToolbarComponent } from '../components/shared/clasic-toolbar/clasic-toolbar.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ClasicToolbarComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule
  ],
  exports:[
    ClasicToolbarComponent,
    RouterModule,
    ReactiveFormsModule
  ]
})
export class SharedModule { }
