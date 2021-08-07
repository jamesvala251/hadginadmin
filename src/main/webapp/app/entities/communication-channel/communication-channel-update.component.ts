import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { ICommunicationChannel, CommunicationChannel } from 'app/shared/model/communication-channel.model';
import { CommunicationChannelService } from './communication-channel.service';

@Component({
  selector: 'jhi-communication-channel-update',
  templateUrl: './communication-channel-update.component.html',
})
export class CommunicationChannelUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    channelName: [null, [Validators.required]],
    description: [null, [Validators.required]],
    status: [],
    modifiedOn: [],
    modifiedBy: [],
  });

  constructor(
    protected communicationChannelService: CommunicationChannelService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ communicationChannel }) => {
      if (!communicationChannel.id) {
        const today = moment().startOf('day');
        communicationChannel.modifiedOn = today;
      }

      this.updateForm(communicationChannel);
    });
  }

  updateForm(communicationChannel: ICommunicationChannel): void {
    this.editForm.patchValue({
      id: communicationChannel.id,
      channelName: communicationChannel.channelName,
      description: communicationChannel.description,
      status: communicationChannel.status,
      modifiedOn: communicationChannel.modifiedOn ? communicationChannel.modifiedOn.format(DATE_TIME_FORMAT) : null,
      modifiedBy: communicationChannel.modifiedBy,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const communicationChannel = this.createFromForm();
    if (communicationChannel.id !== undefined) {
      this.subscribeToSaveResponse(this.communicationChannelService.update(communicationChannel));
    } else {
      this.subscribeToSaveResponse(this.communicationChannelService.create(communicationChannel));
    }
  }

  private createFromForm(): ICommunicationChannel {
    return {
      ...new CommunicationChannel(),
      id: this.editForm.get(['id'])!.value,
      channelName: this.editForm.get(['channelName'])!.value,
      description: this.editForm.get(['description'])!.value,
      status: this.editForm.get(['status'])!.value,
      modifiedOn: this.editForm.get(['modifiedOn'])!.value ? moment(this.editForm.get(['modifiedOn'])!.value, DATE_TIME_FORMAT) : undefined,
      modifiedBy: this.editForm.get(['modifiedBy'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICommunicationChannel>>): void {
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
}
