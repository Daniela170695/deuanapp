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
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
