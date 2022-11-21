import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TrackingRequestPage } from './tracking-request.page';

const routes: Routes = [
  {
    path: '',
    component: TrackingRequestPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrackingRequestPageRoutingModule {}
