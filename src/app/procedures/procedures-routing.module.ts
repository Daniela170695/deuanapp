import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProceduresPage } from './procedures.page';

const routes: Routes = [
  {
    path: '',
    component: ProceduresPage
  },
  {
    path: 'tracking-procedures/:id',
    loadChildren: () => import('../tracking-procedures/tracking-procedures.module').then( m => m.TrackingProceduresPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProceduresPageRoutingModule {}
