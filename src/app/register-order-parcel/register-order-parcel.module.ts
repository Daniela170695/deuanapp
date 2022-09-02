import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegisterOrderParcelPageRoutingModule } from './register-order-parcel-routing.module';

import { RegisterOrderParcelPage } from './register-order-parcel.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RegisterOrderParcelPageRoutingModule
  ],
  declarations: [RegisterOrderParcelPage]
})
export class RegisterOrderParcelPageModule {}
