import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RhinocerosPage } from './rhinoceros.page';

const routes: Routes = [
  {
    path: '',
    component: RhinocerosPage
  },
  {
    path: 'tracking-rhinoceros/:id',
    loadChildren: () => import('../tracking-rhinoceros/tracking-rhinoceros.module').then( m => m.TrackingRhinocerosPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RhinocerosPageRoutingModule {}
