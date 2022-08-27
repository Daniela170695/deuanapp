import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TrackingOrderUrbanPageRoutingModule } from './tracking-order-urban-routing.module';

import { TrackingOrderUrbanPage } from './tracking-order-urban.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TrackingOrderUrbanPageRoutingModule
  ],
  declarations: [TrackingOrderUrbanPage]
})
export class TrackingOrderUrbanPageModule {}
