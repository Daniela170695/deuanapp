import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailOrderParcelPage } from './detail-order-parcel.page';

const routes: Routes = [
  {
    path: '',
    component: DetailOrderParcelPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailOrderParcelPageRoutingModule {}
