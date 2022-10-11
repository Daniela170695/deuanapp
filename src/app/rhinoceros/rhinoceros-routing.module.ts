import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RhinocerosPage } from './rhinoceros.page';

const routes: Routes = [
  {
    path: '',
    component: RhinocerosPage
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RhinocerosPageRoutingModule {}
