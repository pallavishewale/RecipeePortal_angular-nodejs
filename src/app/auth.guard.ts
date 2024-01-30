import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private user:UsersService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree {
    if(localStorage.getItem('user')){
      return true

    }
    if (this.user.isAuthenticated()) {

     return true;
    } else {
      console.log("redirect to login page");
      return this.router.createUrlTree(['/login']);
    }
  }
}
