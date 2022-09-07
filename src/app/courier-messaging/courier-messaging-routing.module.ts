import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CourierMessagingPage } from './courier-messaging.page';

const routes: Routes = [
  {
    path: '',
    component: CourierMessagingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CourierMessagingPageRoutingModule {}
