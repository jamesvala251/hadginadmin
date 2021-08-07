import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICommunicationChannel } from 'app/shared/model/communication-channel.model';

@Component({
  selector: 'jhi-communication-channel-detail',
  templateUrl: './communication-channel-detail.component.html',
})
export class CommunicationChannelDetailComponent implements OnInit {
  communicationChannel: ICommunicationChannel | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ communicationChannel }) => (this.communicationChannel = communicationChannel));
  }

  previousState(): void {
    window.history.back();
  }
}
