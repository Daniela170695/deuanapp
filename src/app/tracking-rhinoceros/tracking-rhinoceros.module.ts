import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TrackingRhinocerosPageRoutingModule } from './tracking-rhinoceros-routing.module';

import { TrackingRhinocerosPage } from './tracking-rhinoceros.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TrackingRhinocerosPageRoutingModule
  ],
  declarations: [TrackingRhinocerosPage]
})
export class TrackingRhinocerosPageModule {}
