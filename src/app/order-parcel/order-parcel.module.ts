import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrderParcelPageRoutingModule } from './order-parcel-routing.module';

import { OrderParcelPage } from './order-parcel.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrderParcelPageRoutingModule
  ],
  declarations: [OrderParcelPage]
})
export class OrderParcelPageModule {}
