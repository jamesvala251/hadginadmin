import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { UserManagementFeSharedModule } from 'app/shared/shared.module';
import { PermissionComponent } from './permission.component';
import { PermissionDetailComponent } from './permission-detail.component';
import { PermissionUpdateComponent } from './permission-update.component';
import { PermissionDeleteDialogComponent } from './permission-delete-dialog.component';
import { permissionRoute } from './permission.route';

@NgModule({
  imports: [UserManagementFeSharedModule, RouterModule.forChild(permissionRoute)],
  declarations: [PermissionComponent, PermissionDetailComponent, PermissionUpdateComponent, PermissionDeleteDialogComponent],
  entryComponents: [PermissionDeleteDialogComponent],
})
export class UserManagementFePermissionModule {}
