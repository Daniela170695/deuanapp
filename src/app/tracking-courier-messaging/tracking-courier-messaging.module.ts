import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SharedModule } from '../shared/shared.module';

import { TrackingCourierMessagingPageRoutingModule } from './tracking-courier-messaging-routing.module';

import { TrackingCourierMessagingPage } from './tracking-courier-messaging.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TrackingCourierMessagingPageRoutingModule,
    SharedModule
  ],
  declarations: [TrackingCourierMessagingPage]
})
export class TrackingCourierMessagingPageModule {}
