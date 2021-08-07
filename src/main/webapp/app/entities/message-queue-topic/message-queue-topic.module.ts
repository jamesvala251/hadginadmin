import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { UserManagementFeSharedModule } from 'app/shared/shared.module';
import { MessageQueueTopicComponent } from './message-queue-topic.component';
import { MessageQueueTopicDetailComponent } from './message-queue-topic-detail.component';
import { MessageQueueTopicUpdateComponent } from './message-queue-topic-update.component';
import { MessageQueueTopicDeleteDialogComponent } from './message-queue-topic-delete-dialog.component';
import { messageQueueTopicRoute } from './message-queue-topic.route';

@NgModule({
  imports: [UserManagementFeSharedModule, RouterModule.forChild(messageQueueTopicRoute)],
  declarations: [
    MessageQueueTopicComponent,
    MessageQueueTopicDetailComponent,
    MessageQueueTopicUpdateComponent,
    MessageQueueTopicDeleteDialogComponent,
  ],
  entryComponents: [MessageQueueTopicDeleteDialogComponent],
})
export class UserManagementFeMessageQueueTopicModule {}
