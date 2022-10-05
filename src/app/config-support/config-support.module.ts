import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SharedModule } from '../shared/shared.module';

import { ConfigSupportPageRoutingModule } from './config-support-routing.module';

import { ConfigSupportPage } from './config-support.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ConfigSupportPageRoutingModule,
    SharedModule
  ],
  declarations: [ConfigSupportPage]
})
export class ConfigSupportPageModule {}
