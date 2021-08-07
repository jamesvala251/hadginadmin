import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { UserManagementFeSharedModule } from 'app/shared/shared.module';
import { DisableAccountRequestComponent } from './disable-account-request.component';
import { DisableAccountRequestDetailComponent } from './disable-account-request-detail.component';
import { DisableAccountRequestUpdateComponent } from './disable-account-request-update.component';
import { DisableAccountRequestDeleteDialogComponent } from './disable-account-request-delete-dialog.component';
import { disableAccountRequestRoute } from './disable-account-request.route';

@NgModule({
  imports: [UserManagementFeSharedModule, RouterModule.forChild(disableAccountRequestRoute)],
  declarations: [
    DisableAccountRequestComponent,
    DisableAccountRequestDetailComponent,
    DisableAccountRequestUpdateComponent,
    DisableAccountRequestDeleteDialogComponent,
  ],
  entryComponents: [DisableAccountRequestDeleteDialogComponent],
})
export class UserManagementFeDisableAccountRequestModule {}
