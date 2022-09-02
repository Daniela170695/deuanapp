import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailOrderUrbanPage } from './detail-order-urban.page';

const routes: Routes = [
  {
    path: '',
    component: DetailOrderUrbanPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailOrderUrbanPageRoutingModule {}
