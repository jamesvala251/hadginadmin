import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IMessageQueueTopic, MessageQueueTopic } from 'app/shared/model/message-queue-topic.model';
import { MessageQueueTopicService } from './message-queue-topic.service';
import { ICommunicationChannel } from 'app/shared/model/communication-channel.model';
import { CommunicationChannelService } from 'app/entities/communication-channel/communication-channel.service';

@Component({
  selector: 'jhi-message-queue-topic-update',
  templateUrl: './message-queue-topic-update.component.html',
})
export class MessageQueueTopicUpdateComponent implements OnInit {
  isSaving = false;
  communicationchannels: ICommunicationChannel[] = [];

  editForm = this.fb.group({
    id: [],
    topicName: [null, [Validators.required]],
    description: [null, [Validators.required]],
    status: [],
    modifiedOn: [],
    modifiedBy: [],
    communicationChannels: [],
  });

  constructor(
    protected messageQueueTopicService: MessageQueueTopicService,
    protected communicationChannelService: CommunicationChannelService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ messageQueueTopic }) => {
      if (!messageQueueTopic.id) {
        const today = moment().startOf('day');
        messageQueueTopic.modifiedOn = today;
      }

      this.updateForm(messageQueueTopic);

      this.communicationChannelService
        .query()
        .subscribe((res: HttpResponse<ICommunicationChannel[]>) => (this.communicationchannels = res.body || []));
    });
  }

  updateForm(messageQueueTopic: IMessageQueueTopic): void {
    this.editForm.patchValue({
      id: messageQueueTopic.id,
      topicName: messageQueueTopic.topicName,
      description: messageQueueTopic.description,
      status: messageQueueTopic.status,
      modifiedOn: messageQueueTopic.modifiedOn ? messageQueueTopic.modifiedOn.format(DATE_TIME_FORMAT) : null,
      modifiedBy: messageQueueTopic.modifiedBy,
      communicationChannels: messageQueueTopic.communicationChannels,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const messageQueueTopic = this.createFromForm();
    if (messageQueueTopic.id !== undefined) {
      this.subscribeToSaveResponse(this.messageQueueTopicService.update(messageQueueTopic));
    } else {
      this.subscribeToSaveResponse(this.messageQueueTopicService.create(messageQueueTopic));
    }
  }

  private createFromForm(): IMessageQueueTopic {
    return {
      ...new MessageQueueTopic(),
      id: this.editForm.get(['id'])!.value,
      topicName: this.editForm.get(['topicName'])!.value,
      description: this.editForm.get(['description'])!.value,
      status: this.editForm.get(['status'])!.value,
      modifiedOn: this.editForm.get(['modifiedOn'])!.value ? moment(this.editForm.get(['modifiedOn'])!.value, DATE_TIME_FORMAT) : undefined,
      modifiedBy: this.editForm.get(['modifiedBy'])!.value,
      communicationChannels: this.editForm.get(['communicationChannels'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IMessageQueueTopic>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: ICommunicationChannel): any {
    return item.id;
  }

  getSelected(selectedVals: ICommunicationChannel[], option: ICommunicationChannel): ICommunicationChannel {
    if (selectedVals) {
      for (let i = 0; i < selectedVals.length; i++) {
        if (option.id === selectedVals[i].id) {
          return selectedVals[i];
        }
      }
    }
    return option;
  }
}
