import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConfigSupportPage } from './config-support.page';

const routes: Routes = [
  {
    path: '',
    component: ConfigSupportPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfigSupportPageRoutingModule {}
