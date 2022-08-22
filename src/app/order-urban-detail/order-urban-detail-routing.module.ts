import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrderUrbanDetailPage } from './order-urban-detail.page';

const routes: Routes = [
  {
    path: '',
    component: OrderUrbanDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderUrbanDetailPageRoutingModule {}
