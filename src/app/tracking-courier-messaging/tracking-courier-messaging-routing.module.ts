import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TrackingCourierMessagingPage } from './tracking-courier-messaging.page';

const routes: Routes = [
  {
    path: '',
    component: TrackingCourierMessagingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrackingCourierMessagingPageRoutingModule {}
