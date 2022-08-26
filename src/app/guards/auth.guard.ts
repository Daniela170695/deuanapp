import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, UrlTree, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {

  constructor(private router: Router, private authService: AuthService) { }

  async canLoad(route: Route, segments: UrlSegment[]): Promise<boolean | UrlTree>{
    const user = await this.authService.getCurrentUser();
    if(user){
      if(user.emailVerified){
        return true;
      }
    }
    this.router.navigate(['login']);
    return false;
  }

}
