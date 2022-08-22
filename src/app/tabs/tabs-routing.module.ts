import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('../home/home.module').then(m => m.HomePageModule)
      },
      {
        path: 'order-urban',
        loadChildren: () => import('../order-urban/order-urban.module').then(m => m.OrderUrbanPageModule),
      },
      {
        path: 'order-parcel',
        loadChildren: () => import('../order-parcel/order-parcel.module').then(m => m.OrderParcelPageModule)
      },
      {
        path: 'config-support',
        loadChildren: () => import('../config-support/config-support.module').then(m => m.ConfigSupportPageModule)
      },
      {
        path: 'payments',
        loadChildren: () => import('../payments/payments.module').then(m => m.PaymentsPageModule)
      },
      {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
