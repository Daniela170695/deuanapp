import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrderUrbanPageRoutingModule } from './order-urban-routing.module';

import { OrderUrbanPage } from './order-urban.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    OrderUrbanPageRoutingModule
  ],
  declarations: [OrderUrbanPage]
})
export class OrderUrbanPageModule {}
