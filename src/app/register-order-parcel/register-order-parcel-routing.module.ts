import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterOrderParcelPage } from './register-order-parcel.page';

const routes: Routes = [
  {
    path: '',
    component: RegisterOrderParcelPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegisterOrderParcelPageRoutingModule {}
