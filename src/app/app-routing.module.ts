import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',//intro
    pathMatch: 'full'
  },
  {
    path: 'mis-reparaciones',
    loadChildren: () => import('./pages/mis-reparaciones/mis-reparaciones.module').then( m => m.MisReparacionesPageModule),
    // canActivate:[AuthGuard,IsActiveGuard]
  },
  {
    path: 'mi-cuenta',
    loadChildren: () => import('./pages/mi-cuenta/mi-cuenta.module').then( m => m.MiCuentaPageModule),
    // canActivate:[AuthGuard]
  },
  {
    path: 'notificaciones',
    loadChildren: () => import('./pages/notificaciones/notificaciones.module').then( m => m.NotificacionesPageModule),
    // canActivate:[AuthGuard,IsActiveGuard]
  },
  {
    path: 'ayuda',
    loadChildren: () => import('./pages/ayuda/ayuda.module').then( m => m.AyudaPageModule)
  },
  {
    path: 'intro',
    loadChildren: () => import('./pages/intro/intro.module').then( m => m.IntroPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'tienda',
    loadChildren: () => import('./pages/tienda/tienda.module').then( m => m.TiendaPageModule)
  },
  {
    path: 'cuentas-clientes',
    loadChildren: () => import('./pages/deudores/cuentas-clientes.module').then( m => m.CuentasClientesModule)
  },
  {
    path: 'proveedores',
    loadChildren: () => import('./pages/proveedores/proveedores.module').then( m => m.ProveedoresPageModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./pages/dashboard/dashboard.module').then( m => m.DashboardPageModule)
  },
  {
    path: 'lista-modulos',
    loadChildren: () => import('./pages/lista-modulos/lista-modulos.module').then( m => m.ListaModulosPageModule)
  },
  {
    path: 'lista-tactiles',
    loadChildren: () => import('./pages/lista-tactiles/lista-tactiles.module').then( m => m.ListaTactilesPageModule)
  },
  {
    path: 'lista-baterias',
    loadChildren: () => import('./pages/lista-baterias/lista-baterias.module').then( m => m.ListaBateriasPageModule)
  },
  {
    path: 'lista-displays',
    loadChildren: () => import('./pages/lista-displays/lista-displays.module').then( m => m.ListaDisplaysPageModule)
  },
  {
    path: 'lista-flex-de-carga',
    loadChildren: () => import('./pages/lista-flex-de-carga/lista-flex-de-carga.module').then( m => m.ListaFlexDeCargaPageModule)
  },
  {
    path: 'lista-pedidos',
    loadChildren: () => import('./pages/lista-pedidos/lista-pedidos.module').then( m => m.ListaPedidosPageModule)
  },
  {
    path: 'equipos-vendidos',
    loadChildren: () => import('./pages/equipos-vendidos/equipos-vendidos.module').then( m => m.EquiposVendidosPageModule)
  },
  {
    path: 'libro-diario',
    loadChildren: () => import('./pages/libro-diario/libro-diario.module').then( m => m.LibroDiarioPageModule)
  },
  {
    path: 'historial-caja',
    loadChildren: () => import('./pages/historial-caja/historial-caja.module').then( m => m.HistorialCajaPageModule)
  },
  {
    path: 'stock-modulos',
    loadChildren: () => import('./pages/stock-modulos/stock-modulos.module').then( m => m.StockModulosPageModule)
  },  {
    path: 'boletas',
    loadChildren: () => import('./pages/boletas/boletas.module').then( m => m.BoletasPageModule)
  },


 


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
