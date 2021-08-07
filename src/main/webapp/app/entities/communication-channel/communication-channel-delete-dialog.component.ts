import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICommunicationChannel } from 'app/shared/model/communication-channel.model';
import { CommunicationChannelService } from './communication-channel.service';

@Component({
  templateUrl: './communication-channel-delete-dialog.component.html',
})
export class CommunicationChannelDeleteDialogComponent {
  communicationChannel?: ICommunicationChannel;

  constructor(
    protected communicationChannelService: CommunicationChannelService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: string): void {
    this.communicationChannelService.delete(id).subscribe(() => {
      this.eventManager.broadcast('communicationChannelListModification');
      this.activeModal.close();
    });
  }
}
