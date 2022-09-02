import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { NoAuthGuard } from './guards/no-auth.guard';

const routes: Routes = [

  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule),
    canLoad: [NoAuthGuard]
  },
  {
    path: 'register',
    loadChildren: () => import('./register-user/register-user.module').then( m => m.RegisterUserPageModule),
    canLoad: [NoAuthGuard]
  },
  {
    path: 'validate',
    loadChildren: () => import('./validate/validate.module').then( m => m.ValidatePageModule),
    canLoad: [NoAuthGuard]
  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule),
    canLoad: [AuthGuard]
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'register-order-parcel',
    loadChildren: () => import('./register-order-parcel/register-order-parcel.module').then( m => m.RegisterOrderParcelPageModule)
  },
  {
    path: 'detail-order-parcel',
    loadChildren: () => import('./detail-order-parcel/detail-order-parcel.module').then( m => m.DetailOrderParcelPageModule)
  },
  {
    path: 'tracking-order-parcel',
    loadChildren: () => import('./tracking-order-parcel/tracking-order-parcel.module').then( m => m.TrackingOrderParcelPageModule)
  },
  {
    path: 'detail-order-urban',
    loadChildren: () => import('./detail-order-urban/detail-order-urban.module').then( m => m.DetailOrderUrbanPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
