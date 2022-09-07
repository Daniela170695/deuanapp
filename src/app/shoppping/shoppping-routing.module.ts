import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShopppingPage } from './shoppping.page';

const routes: Routes = [
  {
    path: '',
    component: ShopppingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShopppingPageRoutingModule {}
