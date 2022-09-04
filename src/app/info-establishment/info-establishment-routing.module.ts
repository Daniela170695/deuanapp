import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InfoEstablishmentPage } from './info-establishment.page';

const routes: Routes = [
  {
    path: '',
    component: InfoEstablishmentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InfoEstablishmentPageRoutingModule {}
