import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, UrlTree, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class NoAuthGuard implements CanLoad {

  constructor(private router: Router, private authService:AuthService) { }

  async canLoad(route: Route, segments: UrlSegment[]): Promise<boolean | UrlTree>{
    const user = await this.authService.getCurrentUser();
    if(user){
      if(user.emailVerified){
        this.router.navigate(['principal']);
        return false;
      }
    }
    return true;
  }

}
