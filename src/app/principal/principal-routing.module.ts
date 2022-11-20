import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrincipalPage } from './principal.page';

const routes: Routes = [
  {
    path: '',
    component: PrincipalPage
  },
  {
    path: 'store',
    loadChildren: () => import('../store/store.module').then( m => m.StorePageModule)
  },
  {
    path: 'type-service',
    loadChildren: () => import('../type-service/type-service.module').then( m => m.TypeServicePageModule)
  },
  {
    path: 'rhinoceros',
    loadChildren: () => import('../rhinoceros/rhinoceros.module').then( m => m.RhinocerosPageModule)
  },
  {
    path: 'tracking-rhinoceros/:id',
    loadChildren: () => import('../tracking-rhinoceros/tracking-rhinoceros.module').then( m => m.TrackingRhinocerosPageModule)
  },
  {
    path: 'tracking-procedures/:id',
    loadChildren: () => import('../tracking-procedures/tracking-procedures.module').then( m => m.TrackingProceduresPageModule)
  },
  {
    path: 'tracking-purchase/:id',
    loadChildren: () => import('../tracking-purchase/tracking-purchase.module').then( m => m.TrackingPurchasePageModule)
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
export class PrincipalPageRoutingModule {}
