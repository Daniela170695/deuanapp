import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TrackingRhinocerosPage } from './tracking-rhinoceros.page';

const routes: Routes = [
  {
    path: '',
    component: TrackingRhinocerosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrackingRhinocerosPageRoutingModule {}
