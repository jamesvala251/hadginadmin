import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IUserContacts } from 'app/shared/model/user-contacts.model';
import { UserContactsService } from './user-contacts.service';

@Component({
  templateUrl: './user-contacts-delete-dialog.component.html',
})
export class UserContactsDeleteDialogComponent {
  userContacts?: IUserContacts;

  constructor(
    protected userContactsService: UserContactsService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: string): void {
    this.userContactsService.delete(id).subscribe(() => {
      this.eventManager.broadcast('userContactsListModification');
      this.activeModal.close();
    });
  }
}
