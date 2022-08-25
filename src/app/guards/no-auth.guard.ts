import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class NoAuthGuard implements CanLoad {

  constructor(private router: Router){ }

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree{
    const idEstablishment = localStorage.getItem("establishment");
    if(idEstablishment){
      this.router.navigate(["tabs/home"]);
      return false;
    }
    else{
      return true;
    }

  }

}
