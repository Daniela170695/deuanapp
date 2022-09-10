import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TrackingProceduresPageRoutingModule } from './tracking-procedures-routing.module';

import { TrackingProceduresPage } from './tracking-procedures.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TrackingProceduresPageRoutingModule
  ],
  declarations: [TrackingProceduresPage]
})
export class TrackingProceduresPageModule {}
