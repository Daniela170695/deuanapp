import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShopppingPageRoutingModule } from './shoppping-routing.module';

import { ShopppingPage } from './shoppping.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShopppingPageRoutingModule
  ],
  declarations: [ShopppingPage]
})
export class ShopppingPageModule {}
