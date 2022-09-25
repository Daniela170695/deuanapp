import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, UrlTree, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { Observable } from 'rxjs';
import { take, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {

  constructor(private router: Router, private authService: AuthService) { }

  async canLoad(route: Route, segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree{
    this.authService.getCurrentUser().pipe(
      take(1),
      map(user=>{
        if(user){
          if(user.emailVerified){
            return true;
          }
        }
        this.router.navigate(['login']);
        return false;
      })
    );
  }

}
