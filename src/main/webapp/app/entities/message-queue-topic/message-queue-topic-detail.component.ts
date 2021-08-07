import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IMessageQueueTopic } from 'app/shared/model/message-queue-topic.model';

@Component({
  selector: 'jhi-message-queue-topic-detail',
  templateUrl: './message-queue-topic-detail.component.html',
})
export class MessageQueueTopicDetailComponent implements OnInit {
  messageQueueTopic: IMessageQueueTopic | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ messageQueueTopic }) => (this.messageQueueTopic = messageQueueTopic));
  }

  previousState(): void {
    window.history.back();
  }
}
