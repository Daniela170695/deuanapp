import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProceduresPage } from './procedures.page';

const routes: Routes = [
  {
    path: '',
    component: ProceduresPage
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
export class ProceduresPageRoutingModule {}
