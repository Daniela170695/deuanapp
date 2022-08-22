import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrderParcelPage } from './order-parcel.page';

const routes: Routes = [
  {
    path: '',
    component: OrderParcelPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderParcelPageRoutingModule {}
