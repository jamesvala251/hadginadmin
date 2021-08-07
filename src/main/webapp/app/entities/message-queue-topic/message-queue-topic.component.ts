import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IMessageQueueTopic } from 'app/shared/model/message-queue-topic.model';
import { MessageQueueTopicService } from './message-queue-topic.service';
import { MessageQueueTopicDeleteDialogComponent } from './message-queue-topic-delete-dialog.component';

@Component({
  selector: 'jhi-message-queue-topic',
  templateUrl: './message-queue-topic.component.html',
})
export class MessageQueueTopicComponent implements OnInit, OnDestroy {
  messageQueueTopics?: IMessageQueueTopic[];
  eventSubscriber?: Subscription;

  constructor(
    protected messageQueueTopicService: MessageQueueTopicService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.messageQueueTopicService
      .query()
      .subscribe((res: HttpResponse<IMessageQueueTopic[]>) => (this.messageQueueTopics = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInMessageQueueTopics();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IMessageQueueTopic): string {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInMessageQueueTopics(): void {
    this.eventSubscriber = this.eventManager.subscribe('messageQueueTopicListModification', () => this.loadAll());
  }

  delete(messageQueueTopic: IMessageQueueTopic): void {
    const modalRef = this.modalService.open(MessageQueueTopicDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.messageQueueTopic = messageQueueTopic;
  }
}
