import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Account } from 'app/core/user/account.model';
import { AccountService } from 'app/core/auth/account.service';
import { AuthServerProvider } from 'app/core/auth/auth-jwt.service';
import { Login } from './login.model';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class LoginService {
  constructor(private authServerProvider: AuthServerProvider, private router: Router) {}

  login(credentials: Login): Observable<void> {
    return this.authServerProvider.login(credentials);
  }

  logout(): void {
    this.authServerProvider.logout().subscribe(null, null, () => {
      // this.accountService.authenticate(null);
      this.router.navigate(['login']);
    });
  }
}
