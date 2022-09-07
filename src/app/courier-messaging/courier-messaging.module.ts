import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CourierMessagingPageRoutingModule } from './courier-messaging-routing.module';

import { CourierMessagingPage } from './courier-messaging.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CourierMessagingPageRoutingModule
  ],
  declarations: [CourierMessagingPage]
})
export class CourierMessagingPageModule {}
