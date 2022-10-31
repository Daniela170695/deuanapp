import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, UrlTree, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { Observable } from 'rxjs';
import { take, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NoAuthGuard implements CanLoad {

  constructor(private router: Router, private authService:AuthService) { }

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.getAuthState().pipe(
      take(1),
      map(user =>{
        if(user){
          if(user.emailVerified){
            this.router.navigate(['principal']);
            return false;
          }
        }
        return true;
      })
    );
  }

}
