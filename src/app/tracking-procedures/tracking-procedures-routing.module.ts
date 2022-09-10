import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TrackingProceduresPage } from './tracking-procedures.page';

const routes: Routes = [
  {
    path: '',
    component: TrackingProceduresPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrackingProceduresPageRoutingModule {}
