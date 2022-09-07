import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RhinocerosPageRoutingModule } from './rhinoceros-routing.module';

import { RhinocerosPage } from './rhinoceros.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RhinocerosPageRoutingModule
  ],
  declarations: [RhinocerosPage]
})
export class RhinocerosPageModule {}
