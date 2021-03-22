import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrearOrdenPasoPageRoutingModule } from './crear-orden-paso-routing.module';

import { CrearOrdenPasoPage } from './crear-orden-paso.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CrearOrdenPasoPageRoutingModule,
    ComponentsModule
  ],
  declarations: [CrearOrdenPasoPage]
})
export class CrearOrdenPasoPageModule { }
