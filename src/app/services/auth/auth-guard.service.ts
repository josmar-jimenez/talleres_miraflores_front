import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()

export class AuthGuardService implements CanActivate {

  constructor(public auth: AuthService, public router: Router) {}

  canActivate(): boolean {
    if (!this.auth.isAuthenticated()) {
      console.log("HEY; SE HA EXPIRADO TODO")
      this.router.navigateByUrl('/login').then(() => {
        this.auth.reloadPage();
      });
      return false;
    }
    return true;
  }

}