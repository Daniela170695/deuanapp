import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConfigSupportPageRoutingModule } from './config-support-routing.module';

import { ConfigSupportPage } from './config-support.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConfigSupportPageRoutingModule
  ],
  declarations: [ConfigSupportPage]
})
export class ConfigSupportPageModule {}
