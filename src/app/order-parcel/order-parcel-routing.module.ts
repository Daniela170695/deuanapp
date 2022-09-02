import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrderParcelPage } from './order-parcel.page';

const routes: Routes = [
  {
    path: '',
    component: OrderParcelPage
  },
  {
    path: 'register-order-parcel',
    loadChildren: () => import('../register-order-parcel/register-order-parcel.module').then( m => m.RegisterOrderParcelPageModule)
  },
  {
    path: 'detail-order-parcel/:id',
    loadChildren: () => import('../detail-order-parcel/detail-order-parcel.module').then( m => m.DetailOrderParcelPageModule)
  },
  {
    path: 'tracking-order-parcel/:id',
    loadChildren: () => import('../tracking-order-parcel/tracking-order-parcel.module').then( m => m.TrackingOrderParcelPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderParcelPageRoutingModule {}
