import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IDisableAccountRequest } from 'app/shared/model/disable-account-request.model';
import { DisableAccountRequestService } from './disable-account-request.service';

@Component({
  templateUrl: './disable-account-request-delete-dialog.component.html',
})
export class DisableAccountRequestDeleteDialogComponent {
  disableAccountRequest?: IDisableAccountRequest;

  constructor(
    protected disableAccountRequestService: DisableAccountRequestService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: string): void {
    this.disableAccountRequestService.delete(id).subscribe(() => {
      this.eventManager.broadcast('disableAccountRequestListModification');
      this.activeModal.close();
    });
  }
}
