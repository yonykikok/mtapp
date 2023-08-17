import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RepuestosPage } from './repuestos.page';
import { ListaTactilesPage } from '../lista-tactiles/lista-tactiles.page';
import { ListaModulosPage } from '../lista-modulos/lista-modulos.page';
import { ListaBateriasPage } from '../lista-baterias/lista-baterias.page';
import { ListaDisplaysPage } from '../lista-displays/lista-displays.page';
import { ListaFlexDeCargaPage } from '../lista-flex-de-carga/lista-flex-de-carga.page';

const routes: Routes = [
  {
    path: '',
    component: RepuestosPage
  },
  {
    path: 'lista-modulos',
    component:ListaModulosPage
  },
  {
    path: 'lista-tactiles',
    component:ListaTactilesPage
  },
  {
    path: 'lista-baterias',
    component:ListaBateriasPage
  },
  {
    path: 'lista-displays',
    component:ListaDisplaysPage
  },
  {
    path: 'lista-flex-de-carga',
    component:ListaFlexDeCargaPage
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RepuestosPageRoutingModule { }
