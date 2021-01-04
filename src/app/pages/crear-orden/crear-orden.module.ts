import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CrearOrdenPageRoutingModule } from './crear-orden-routing.module';

import { CrearOrdenPage } from './crear-orden.page';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CrearOrdenPageRoutingModule,
    ComponentsModule
  ],
  declarations: [CrearOrdenPage]
})
export class CrearOrdenPageModule { }
