import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TrackingPurchasePage } from './tracking-purchase.page';

const routes: Routes = [
  {
    path: '',
    component: TrackingPurchasePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrackingPurchasePageRoutingModule {}
