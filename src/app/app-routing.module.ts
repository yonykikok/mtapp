import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { EsOwnerGuard } from './guards/es-owner.guard';
import { EsAdminGuard } from './guards/es-admin.guard';
import { EsSTGuard } from './guards/es-st.guard';
import { EsClienteGuard } from './guards/es-cliente.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'intro',//intro
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
    loadChildren: () => import('./pages/dashboard/dashboard.module').then( m => m.DashboardPageModule),canActivate:[EsClienteGuard]
  },
  // {
  //   path: 'lista-modulos',
  //   loadChildren: () => import('./pages/lista-modulos/lista-modulos.module').then( m => m.ListaModulosPageModule)
  // },
  // {
  //   path: 'lista-tactiles',
  //   loadChildren: () => import('./pages/lista-tactiles/lista-tactiles.module').then( m => m.ListaTactilesPageModule)
  // },
  // {
  //   path: 'lista-baterias',
  //   loadChildren: () => import('./pages/lista-baterias/lista-baterias.module').then( m => m.ListaBateriasPageModule)
  // },
  // {
  //   path: 'lista-displays',
  //   loadChildren: () => import('./pages/lista-displays/lista-displays.module').then( m => m.ListaDisplaysPageModule)
  // },
  // {
  //   path: 'lista-flex-de-carga',
  //   loadChildren: () => import('./pages/lista-flex-de-carga/lista-flex-de-carga.module').then( m => m.ListaFlexDeCargaPageModule)
  // },
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
  },
  {
    path: 'boletas',
    loadChildren: () => import('./pages/boletas/boletas.module').then( m => m.BoletasPageModule)
  },
  {
    path: 'trabajos-tercerizados',
    loadChildren: () => import('./pages/trabajos-tercerizados/trabajos-tercerizados.module').then( m => m.TrabajosTercerizadosPageModule)
  },
  {
    path: 'lista-de-usuarios',
    loadChildren: () => import('./pages/lista-de-usuarios/lista-de-usuarios.module').then( m => m.ListaDeUsuariosPageModule)
  },
  {
    path: 'repuestos',
    loadChildren: () => import('./pages/repuestos/repuestos.module').then( m => m.RepuestosPageModule)
  },
  {
    path: 'proveedores/lista-modulos-proveedor',
    loadChildren: () => import('./pages/lista-modulos-proveedor/lista-modulos-proveedor.module').then( m => m.ListaModulosProveedorPageModule)
  },
  {
    path: 'articulos',
    loadChildren: () => import('./pages/articulos/articulos.module').then( m => m.ArticulosPageModule)
  },
  {
    path: 'ajustes-de-repuestos',
    loadChildren: () => import('./pages/ajustes-de-repuestos/ajustes-de-repuestos.module').then( m => m.AjustesDeRepuestosPageModule)
  },
  {
    path: 'equipos-disponibles',
    loadChildren: () => import('./pages/equipos-disponibles/equipos-disponibles.module').then( m => m.EquiposDisponiblesPageModule)
  },
  {
    path: 'equipos',
    loadChildren: () => import('./pages/equipos/equipos.module').then( m => m.EquiposPageModule)
  },
  {
    path: 'servicios',
    loadChildren: () => import('./pages/servicios/servicios.module').then( m => m.ServiciosPageModule)
  },
  {
    path: 'repuestos/lista-glasses',
    loadChildren: () => import('./pages/lista-glass/lista-glass.module').then( m => m.ListaGlassPageModule)
  },  {
    path: 'lista-productos',
    loadChildren: () => import('./pages/lista-productos/lista-productos.module').then( m => m.ListaProductosPageModule)
  },
  {
    path: 'nuevo-libro-diario',
    loadChildren: () => import('./pages/nuevo-libro-diario/nuevo-libro-diario.module').then( m => m.NuevoLibroDiarioPageModule)
  },
  {
    path: 'slide-de-productos',
    loadChildren: () => import('./pages/slide-de-productos/slide-de-productos.module').then( m => m.SlideDeProductosPageModule)
  },
  {
    path: 'reparaciones-new-version',
    loadChildren: () => import('./pages/reparaciones-new-version/reparaciones-new-version.module').then( m => m.ReparacionesNewVersionPageModule)
  },
  {
    path: 'dashboard-new-version',
    loadChildren: () => import('./pages/dashboard-new-version/dashboard-new-version.module').then( m => m.DashboardNewVersionPageModule)
  },







 


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
