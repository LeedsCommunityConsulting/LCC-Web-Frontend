import { Injectable, inject } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  CanActivateFn,
} from '@angular/router';
import { AuthService } from './../services/auth.service';
import { ConstantService } from './../services/constant.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router, private _constantService: ConstantService,) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (!this._constantService.getAuth()) {
      return true; 
    } else {
      this.router.navigate(['/admin/login']);
      return false;
    }
  }
}

export const canActivateGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  if (inject(AuthService).authUserValue) {
    inject(Router).navigate(['/admin/dashboard']);
    return false;
  } else {
    // inject(Router).navigate(['/admin/login']); // Use inject(Router) to get the Router service
    return true;
  }
};

export const HaveAuthGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  if (inject(AuthService).authUserValue) {
    return true;
  } else {
    // inject(Router).navigate(['/admin/login']); // Use inject(Router) to get the Router service
    inject(Router).navigate(['/admin/login']);
    return false
  }
};
