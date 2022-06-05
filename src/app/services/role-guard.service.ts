import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot
} from '@angular/router';
import { UserService } from './user.service';
@Injectable()
export class RoleGuardService implements CanActivate {
  constructor(public auth: UserService, public router: Router) { }
  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRole = route.data.expectedRole;
    const role = localStorage.getItem('role')!;
    if (
      !this.auth.isAuthenticated()) {
      this.router.navigate(['']);
      return false;
    }
    else if (role !== expectedRole) {
      this.router.navigate(['Home']);
      return false;
    }
    return true;
  }
}