import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { UserManagementFeSharedModule } from 'app/shared/shared.module';
import { LOGIN_ROUTE } from './login.route';
import { LoginPageComponent } from './login-page.component';

@NgModule({
  imports: [UserManagementFeSharedModule, RouterModule.forChild([LOGIN_ROUTE])],
  declarations: [LoginPageComponent],
})
export class LoginPageModule {}
