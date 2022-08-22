import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrderUrbanDetailPageRoutingModule } from './order-urban-detail-routing.module';

import { OrderUrbanDetailPage } from './order-urban-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrderUrbanDetailPageRoutingModule
  ],
  declarations: [OrderUrbanDetailPage]
})
export class OrderUrbanDetailPageModule {}
