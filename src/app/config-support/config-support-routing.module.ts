import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConfigSupportPage } from './config-support.page';

const routes: Routes = [
  {
    path: '',
    component: ConfigSupportPage
  },
  {
    path: 'info-account',
    loadChildren: () => import('../info-account/info-account.module').then( m => m.InfoAccountPageModule)
  },
  {
    path: 'info-establishment',
    loadChildren: () => import('../info-establishment/info-establishment.module').then( m => m.InfoEstablishmentPageModule)
  },
  {
    path: 'contact',
    loadChildren: () => import('../contact/contact.module').then( m => m.ContactPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfigSupportPageRoutingModule {}
