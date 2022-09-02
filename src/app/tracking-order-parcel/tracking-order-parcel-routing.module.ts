import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TrackingOrderParcelPage } from './tracking-order-parcel.page';

const routes: Routes = [
  {
    path: '',
    component: TrackingOrderParcelPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrackingOrderParcelPageRoutingModule {}
