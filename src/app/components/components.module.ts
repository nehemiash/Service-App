import { NgModule } from '@angular/core';
import { CommonModule, formatCurrency } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { IonicModule } from '@ionic/angular';
import { MenuComponent } from './menu/menu.component';
import { RouterModule } from '@angular/router';
import { ClienteDetalleComponent } from './cliente-detalle/cliente-detalle.component';
import { FormsModule } from '@angular/forms';
import { NuevoClienteComponent } from './nuevo-cliente/nuevo-cliente.component';
import { NuevoProductoComponent } from './nuevo-producto/nuevo-producto.component';
import { ProductoDetalleComponent } from './producto-detalle/producto-detalle.component';
import { NuevoRepuestoComponent } from './nuevo-repuesto/nuevo-repuesto.component';
import { RespuestoDetalleComponent } from './respuesto-detalle/respuesto-detalle.component';
import { NuevaCategoriaComponent } from './nueva-categoria/nueva-categoria.component';
import { CategoriaDetalleComponent } from './categoria-detalle/categoria-detalle.component';
import { ClienteBuscarComponent } from './cliente-buscar/cliente-buscar.component';
import { ProductoBuscarComponent } from './producto-buscar/producto-buscar.component';
import { NuevaNotaComponent } from './nueva-nota/nueva-nota.component';
import { ProblemasComponent } from './problemas/problemas.component';
import { OrdenDetalleComponent } from './orden-detalle/orden-detalle.component';

@NgModule({
  entryComponents: [
    ClienteDetalleComponent
  ],
  declarations: [
    HeaderComponent,
    MenuComponent,
    ClienteDetalleComponent,
    NuevoClienteComponent,
    NuevoProductoComponent,
    ProductoDetalleComponent,
    NuevoRepuestoComponent,
    RespuestoDetalleComponent,
    NuevaCategoriaComponent,
    CategoriaDetalleComponent,
    ClienteBuscarComponent,
    ProductoBuscarComponent,
    NuevaNotaComponent,
    ProblemasComponent,
    OrdenDetalleComponent,
  ],
  exports: [
    HeaderComponent,
    MenuComponent,
    ClienteDetalleComponent,
    NuevoClienteComponent,
    NuevoProductoComponent,
    ProductoDetalleComponent,
    NuevoRepuestoComponent,
    RespuestoDetalleComponent,
    NuevaCategoriaComponent,
    CategoriaDetalleComponent,
    ClienteBuscarComponent,
    ProductoBuscarComponent,
    NuevaNotaComponent,
    ProblemasComponent,
    OrdenDetalleComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
    FormsModule,
  ]
})
export class ComponentsModule { }
