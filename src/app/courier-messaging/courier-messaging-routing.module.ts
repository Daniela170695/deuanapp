import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CourierMessagingPage } from './courier-messaging.page';

const routes: Routes = [
  {
    path: '',
    component: CourierMessagingPage
  },
  {
    path: 'tracking-courier-messaging/:id',
    loadChildren: () => import('../tracking-courier-messaging/tracking-courier-messaging.module').then( m => m.TrackingCourierMessagingPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CourierMessagingPageRoutingModule {}
