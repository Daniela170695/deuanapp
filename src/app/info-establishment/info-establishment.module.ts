import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InfoEstablishmentPageRoutingModule } from './info-establishment-routing.module';

import { InfoEstablishmentPage } from './info-establishment.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    InfoEstablishmentPageRoutingModule
  ],
  declarations: [InfoEstablishmentPage]
})
export class InfoEstablishmentPageModule {}
