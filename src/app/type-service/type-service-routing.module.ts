import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TypeServicePage } from './type-service.page';

const routes: Routes = [
  {
    path: '',
    component: TypeServicePage
  },
  {
    path: 'courier-messaging',
    loadChildren: () => import('../courier-messaging/courier-messaging.module').then( m => m.CourierMessagingPageModule)
  },
  {
    path: 'shoppping',
    loadChildren: () => import('../shoppping/shoppping.module').then( m => m.ShopppingPageModule)
  },
  {
    path: 'procedures',
    loadChildren: () => import('../procedures/procedures.module').then( m => m.ProceduresPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TypeServicePageRoutingModule {}
