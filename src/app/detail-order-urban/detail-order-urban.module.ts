import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailOrderUrbanPageRoutingModule } from './detail-order-urban-routing.module';

import { DetailOrderUrbanPage } from './detail-order-urban.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailOrderUrbanPageRoutingModule
  ],
  declarations: [DetailOrderUrbanPage]
})
export class DetailOrderUrbanPageModule {}
