import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RepuestosPageRoutingModule } from './repuestos-routing.module';

import { RepuestosPage } from './repuestos.page';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RepuestosPageRoutingModule,
    ComponentsModule
  ],
  declarations: [RepuestosPage]
})
export class RepuestosPageModule { }
