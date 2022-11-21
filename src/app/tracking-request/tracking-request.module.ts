import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TrackingRequestPageRoutingModule } from './tracking-request-routing.module';

import { TrackingRequestPage } from './tracking-request.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TrackingRequestPageRoutingModule
  ],
  declarations: [TrackingRequestPage]
})
export class TrackingRequestPageModule {}
