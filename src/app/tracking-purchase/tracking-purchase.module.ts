import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SharedModule } from '../shared/shared.module';

import { TrackingPurchasePageRoutingModule } from './tracking-purchase-routing.module';

import { TrackingPurchasePage } from './tracking-purchase.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TrackingPurchasePageRoutingModule,
    SharedModule
  ],
  declarations: [TrackingPurchasePage]
})
export class TrackingPurchasePageModule {}
