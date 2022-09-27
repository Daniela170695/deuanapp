import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SharedModule } from '../shared/shared.module';

import { TrackingRhinocerosPageRoutingModule } from './tracking-rhinoceros-routing.module';

import { TrackingRhinocerosPage } from './tracking-rhinoceros.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TrackingRhinocerosPageRoutingModule,
    SharedModule
  ],
  declarations: [TrackingRhinocerosPage]
})
export class TrackingRhinocerosPageModule {}
