import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TypeServicePageRoutingModule } from './type-service-routing.module';

import { TypeServicePage } from './type-service.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TypeServicePageRoutingModule
  ],
  declarations: [TypeServicePage]
})
export class TypeServicePageModule {}
