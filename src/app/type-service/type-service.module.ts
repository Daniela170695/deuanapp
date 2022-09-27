import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SharedModule } from '../shared/shared.module';

import { TypeServicePageRoutingModule } from './type-service-routing.module';

import { TypeServicePage } from './type-service.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TypeServicePageRoutingModule,
    SharedModule
  ],
  declarations: [TypeServicePage]
})
export class TypeServicePageModule {}
