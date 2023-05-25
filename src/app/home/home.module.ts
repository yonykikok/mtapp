import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { AutoWriteTitlesComponent } from '../components/auto-write-titles/auto-write-titles.component';
import { StoryWrapComponent } from '../components/story-wrap/story-wrap.component';
import { FormConsultaComponent } from '../components/form-consulta/form-consulta.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    HomePageRoutingModule,
  ],
  declarations: [HomePage,AutoWriteTitlesComponent,StoryWrapComponent,FormConsultaComponent],
  providers:[]
})
export class HomePageModule {}
