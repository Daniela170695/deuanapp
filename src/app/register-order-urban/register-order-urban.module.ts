import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegisterOrderUrbanPageRoutingModule } from './register-order-urban-routing.module';

import { RegisterOrderUrbanPage } from './register-order-urban.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RegisterOrderUrbanPageRoutingModule
  ],
  declarations: [RegisterOrderUrbanPage]
})
export class RegisterOrderUrbanPageModule {}
