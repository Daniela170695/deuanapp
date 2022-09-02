import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailOrderParcelPageRoutingModule } from './detail-order-parcel-routing.module';

import { DetailOrderParcelPage } from './detail-order-parcel.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailOrderParcelPageRoutingModule
  ],
  declarations: [DetailOrderParcelPage]
})
export class DetailOrderParcelPageModule {}
