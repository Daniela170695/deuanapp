import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrderUrbanPage } from './order-urban.page';

const routes: Routes = [
  {
    path: '',
    component: OrderUrbanPage,
  },
  {
    path: 'register-order-urban',
    loadChildren: () => import('../register-order-urban/register-order-urban.module').then( m => m.RegisterOrderUrbanPageModule)
  },
  {
    path: 'order-urban-detail/:id',
    loadChildren: () => import('../order-urban-detail/order-urban-detail.module').then( m => m.OrderUrbanDetailPageModule)
  },
  {
    path: 'tracking-order-urban/:id',
    loadChildren: () => import('../tracking-order-urban/tracking-order-urban.module').then( m => m.TrackingOrderUrbanPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderUrbanPageRoutingModule {}
