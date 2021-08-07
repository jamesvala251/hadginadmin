import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { UserManagementFeSharedModule } from 'app/shared/shared.module';
import { UserAddressComponent } from './user-address.component';
import { UserAddressDetailComponent } from './user-address-detail.component';
import { UserAddressUpdateComponent } from './user-address-update.component';
import { UserAddressDeleteDialogComponent } from './user-address-delete-dialog.component';
import { userAddressRoute } from './user-address.route';

@NgModule({
  imports: [UserManagementFeSharedModule, RouterModule.forChild(userAddressRoute)],
  declarations: [UserAddressComponent, UserAddressDetailComponent, UserAddressUpdateComponent, UserAddressDeleteDialogComponent],
  entryComponents: [UserAddressDeleteDialogComponent],
})
export class UserManagementFeUserAddressModule {}
