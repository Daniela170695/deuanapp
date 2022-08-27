import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TrackingOrderUrbanPage } from './tracking-order-urban.page';

const routes: Routes = [
  {
    path: '',
    component: TrackingOrderUrbanPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrackingOrderUrbanPageRoutingModule {}
