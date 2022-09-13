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
    path: 'config-support',
    loadChildren: () => import('../config-support/config-support.module').then(m => m.ConfigSupportPageModule)
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrincipalPageRoutingModule {}
