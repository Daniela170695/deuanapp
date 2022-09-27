import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SharedModule } from '../shared/shared.module';

import { RhinocerosPageRoutingModule } from './rhinoceros-routing.module';

import { RhinocerosPage } from './rhinoceros.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RhinocerosPageRoutingModule,
    SharedModule
  ],
  declarations: [RhinocerosPage]
})
export class RhinocerosPageModule {}
