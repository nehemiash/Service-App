import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { UsuarioGuard } from './guards/usuario.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule),
  },
  {
    path: 'perfil',
    loadChildren: () => import('./pages/perfil/perfil.module').then(m => m.PerfilPageModule),
    canLoad: [UsuarioGuard]
  },
  {
    path: 'main',
    loadChildren: () => import('./pages/inicio/inicio.module').then(m => m.InicioPageModule),
    canLoad: [UsuarioGuard]
  },
  {
    path: 'clientes',
    loadChildren: () => import('./pages/clientes/clientes.module').then(m => m.ClientesPageModule),
    canLoad: [UsuarioGuard]

  },
  {
    path: 'productos',
    loadChildren: () => import('./pages/productos/productos.module').then(m => m.ProductosPageModule),
    canLoad: [UsuarioGuard]
  },
  {
    path: 'categorias',
    loadChildren: () => import('./pages/categorias/categorias.module').then(m => m.CategoriasPageModule),
    canLoad: [UsuarioGuard]

  },
  {
    path: 'ordenes',
    loadChildren: () => import('./pages/ordenes/ordenes.module').then(m => m.OrdenesPageModule),
    canLoad: [UsuarioGuard]
  },
  {
    path: 'repuestos',
    loadChildren: () => import('./pages/repuestos/repuestos.module').then(m => m.RepuestosPageModule),
    canLoad: [UsuarioGuard]
  },
  {
    path: 'crear-orden',
    loadChildren: () => import('./pages/crear-orden/crear-orden.module').then(m => m.CrearOrdenPageModule),
    canLoad: [UsuarioGuard]

  },
  {
    path: 'crear-orden-paso',
    loadChildren: () => import('./pages/crear-orden-paso/crear-orden-paso.module').then(m => m.CrearOrdenPasoPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
