import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SharedModule } from '../shared/shared.module';

import { ProceduresPageRoutingModule } from './procedures-routing.module';

import { ProceduresPage } from './procedures.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ProceduresPageRoutingModule,
    SharedModule
  ],
  declarations: [ProceduresPage]
})
export class ProceduresPageModule {}
