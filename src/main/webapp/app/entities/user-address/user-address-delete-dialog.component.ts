import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IUserAddress } from 'app/shared/model/user-address.model';
import { UserAddressService } from './user-address.service';

@Component({
  templateUrl: './user-address-delete-dialog.component.html',
})
export class UserAddressDeleteDialogComponent {
  userAddress?: IUserAddress;

  constructor(
    protected userAddressService: UserAddressService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: string): void {
    this.userAddressService.delete(id).subscribe(() => {
      this.eventManager.broadcast('userAddressListModification');
      this.activeModal.close();
    });
  }
}
