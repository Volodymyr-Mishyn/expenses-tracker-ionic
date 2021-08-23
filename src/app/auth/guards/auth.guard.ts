import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.userHasToken.pipe(
      map((token) => {
        if (route.data?.authRequired) {
          if (token) {
            return true;
          } else {
            this.router.navigateByUrl('/authorize');
            return false;
          }
        } else {
          if (token) {
            this.router.navigateByUrl('/');
            return false;
          } else {
            return true;
          }
        }
      })
    );
  }
}
