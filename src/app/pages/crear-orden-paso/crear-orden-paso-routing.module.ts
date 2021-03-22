import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CrearOrdenPasoPage } from './crear-orden-paso.page';

const routes: Routes = [
  {
    path: '',
    component: CrearOrdenPasoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrearOrdenPasoPageRoutingModule {}
