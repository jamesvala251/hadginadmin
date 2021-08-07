import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { UserManagementFeSharedModule } from 'app/shared/shared.module';
import { HOME_ROUTE } from './home.route';
import { HomeComponent } from './home.component';

@NgModule({
  imports: [UserManagementFeSharedModule, RouterModule.forChild([HOME_ROUTE])],
  declarations: [HomeComponent],
})
export class UserManagementFeHomeModule {}
