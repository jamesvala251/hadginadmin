import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { UserManagementFeSharedModule } from 'app/shared/shared.module';
import { UserContactsComponent } from './user-contacts.component';
import { UserContactsDetailComponent } from './user-contacts-detail.component';
import { UserContactsUpdateComponent } from './user-contacts-update.component';
import { UserContactsDeleteDialogComponent } from './user-contacts-delete-dialog.component';
import { userContactsRoute } from './user-contacts.route';

@NgModule({
  imports: [UserManagementFeSharedModule, RouterModule.forChild(userContactsRoute)],
  declarations: [UserContactsComponent, UserContactsDetailComponent, UserContactsUpdateComponent, UserContactsDeleteDialogComponent],
  entryComponents: [UserContactsDeleteDialogComponent],
})
export class UserManagementFeUserContactsModule {}
