import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ICommunicationChannel } from 'app/shared/model/communication-channel.model';
import { CommunicationChannelService } from './communication-channel.service';
import { CommunicationChannelDeleteDialogComponent } from './communication-channel-delete-dialog.component';

@Component({
  selector: 'jhi-communication-channel',
  templateUrl: './communication-channel.component.html',
})
export class CommunicationChannelComponent implements OnInit, OnDestroy {
  communicationChannels?: ICommunicationChannel[];
  eventSubscriber?: Subscription;

  constructor(
    protected communicationChannelService: CommunicationChannelService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.communicationChannelService
      .query()
      .subscribe((res: HttpResponse<ICommunicationChannel[]>) => (this.communicationChannels = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInCommunicationChannels();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ICommunicationChannel): string {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInCommunicationChannels(): void {
    this.eventSubscriber = this.eventManager.subscribe('communicationChannelListModification', () => this.loadAll());
  }

  delete(communicationChannel: ICommunicationChannel): void {
    const modalRef = this.modalService.open(CommunicationChannelDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.communicationChannel = communicationChannel;
  }
}
