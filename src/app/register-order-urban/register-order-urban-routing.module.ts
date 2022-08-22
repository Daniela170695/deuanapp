import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterOrderUrbanPage } from './register-order-urban.page';

const routes: Routes = [
  {
    path: '',
    component: RegisterOrderUrbanPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegisterOrderUrbanPageRoutingModule {}
