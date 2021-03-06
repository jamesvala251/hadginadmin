import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

import { LoginService } from 'app/core/login/login.service';
import { AccountService } from 'app/core/auth/account.service';
import { Account } from 'app/core/user/account.model';

@Component({
  selector: 'jhi-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['login-page.scss'],
})
export class LoginPageComponent implements AfterViewInit {
  @ViewChild('username', { static: false })
  username?: ElementRef;

  authenticationError = false;

  loginForm = this.fb.group({
    username: [''],
    password: [''],
    rememberMe: [false],
  });

  constructor(private loginService: LoginService, private router: Router, private fb: FormBuilder) // private accountService: AccountService
  {}

  ngAfterViewInit(): void {
    if (this.username) {
      this.username.nativeElement.focus();
    }
  }

  cancel(): void {
    this.authenticationError = false;
    this.loginForm.patchValue({
      username: '',
      password: '',
    });
  }

  login(): void {
    this.router.navigate(['home']);
    // this.loginService
    //   .login({
    //     username: this.loginForm.get('username')!.value,
    //     password: this.loginForm.get('password')!.value,
    //     rememberMe: this.loginForm.get('rememberMe')!.value,
    //   })
    //   .subscribe(
    //     () => {
    //       this.authenticationError = false;
    //       this.accountService.identity(true).subscribe((res: Account | null) => {
    //         if (
    //           this.router.url === '/account/register' ||
    //           this.router.url.startsWith('/account/activate') ||
    //           this.router.url.startsWith('/account/reset/')
    //         ) {
    //           this.router.navigate(['']);
    //         } else {
    //           this.router.navigate(['home']);
    //         }
    //       });
    //     },
    //     () => (this.authenticationError = true)
    //   );
  }

  register(): void {
    this.router.navigate(['/account/register']);
  }

  requestResetPassword(): void {
    this.router.navigate(['/account/reset', 'request']);
  }
}
