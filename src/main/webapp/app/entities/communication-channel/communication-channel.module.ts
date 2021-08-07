import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { UserManagementFeSharedModule } from 'app/shared/shared.module';
import { CommunicationChannelComponent } from './communication-channel.component';
import { CommunicationChannelDetailComponent } from './communication-channel-detail.component';
import { CommunicationChannelUpdateComponent } from './communication-channel-update.component';
import { CommunicationChannelDeleteDialogComponent } from './communication-channel-delete-dialog.component';
import { communicationChannelRoute } from './communication-channel.route';

@NgModule({
  imports: [UserManagementFeSharedModule, RouterModule.forChild(communicationChannelRoute)],
  declarations: [
    CommunicationChannelComponent,
    CommunicationChannelDetailComponent,
    CommunicationChannelUpdateComponent,
    CommunicationChannelDeleteDialogComponent,
  ],
  entryComponents: [CommunicationChannelDeleteDialogComponent],
})
export class UserManagementFeCommunicationChannelModule {}
