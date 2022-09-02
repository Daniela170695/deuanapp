import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TrackingOrderParcelPageRoutingModule } from './tracking-order-parcel-routing.module';

import { TrackingOrderParcelPage } from './tracking-order-parcel.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TrackingOrderParcelPageRoutingModule
  ],
  declarations: [TrackingOrderParcelPage]
})
export class TrackingOrderParcelPageModule {}
