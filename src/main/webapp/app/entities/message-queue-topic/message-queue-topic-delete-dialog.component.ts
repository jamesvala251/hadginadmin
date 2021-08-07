import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IMessageQueueTopic } from 'app/shared/model/message-queue-topic.model';
import { MessageQueueTopicService } from './message-queue-topic.service';

@Component({
  templateUrl: './message-queue-topic-delete-dialog.component.html',
})
export class MessageQueueTopicDeleteDialogComponent {
  messageQueueTopic?: IMessageQueueTopic;

  constructor(
    protected messageQueueTopicService: MessageQueueTopicService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: string): void {
    this.messageQueueTopicService.delete(id).subscribe(() => {
      this.eventManager.broadcast('messageQueueTopicListModification');
      this.activeModal.close();
    });
  }
}
