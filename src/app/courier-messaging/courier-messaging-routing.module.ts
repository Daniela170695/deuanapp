import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CourierMessagingPage } from './courier-messaging.page';

const routes: Routes = [
  {
    path: '',
    component: CourierMessagingPage
  },
  {
    path: 'tracking-request/:id',
    loadChildren: () => import('../tracking-request/tracking-request.module').then( m => m.TrackingRequestPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CourierMessagingPageRoutingModule {}
