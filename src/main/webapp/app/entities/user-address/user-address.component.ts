import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IUserAddress } from 'app/shared/model/user-address.model';
import { UserAddressService } from './user-address.service';
import { UserAddressDeleteDialogComponent } from './user-address-delete-dialog.component';
import { AccountService } from 'app/core/auth/account.service';

@Component({
  selector: 'jhi-user-address',
  templateUrl: './user-address.component.html',
})
export class UserAddressComponent implements OnInit, OnDestroy {
  userAddresses?: IUserAddress[];
  eventSubscriber?: Subscription;
  userId = '';
  isAdminUser = false;

  constructor(
    // private accountService: AccountService,
    protected userAddressService: UserAddressService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.userAddressService.query().subscribe((res: HttpResponse<IUserAddress[]>) => (this.userAddresses = res.body || []));
  }

  loadByUserId(): void {
    this.userAddressService
      .findAddressesByUserId(this.userId)
      .subscribe((res: HttpResponse<IUserAddress[]>) => (this.userAddresses = res.body || []));
  }

  ngOnInit(): void {
    // this.accountService.identity().subscribe(account => {
    //   if (account) {
    //     this.userId = account.login;
    //     if (account.permissions.some((permission: string) => permission === 'manage_users')) {
    //       this.isAdminUser = true;
    //     }
    //     if (account.authorities.some((authorities: string) => authorities === 'ROLE_ADMIN')) {
    //       this.isAdminUser = true;
    //     }
    //   }
    // });
    if (this.isAdminUser) {
      this.loadAll();
    } else {
      this.loadByUserId();
    }
    this.registerChangeInUserAddresses();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IUserAddress): string {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInUserAddresses(): void {
    this.eventSubscriber = this.eventManager.subscribe('userAddressListModification', () => {
      if (this.isAdminUser) {
        this.loadAll();
      } else {
        this.loadByUserId();
      }
    });
  }

  delete(userAddress: IUserAddress): void {
    const modalRef = this.modalService.open(UserAddressDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.userAddress = userAddress;
  }
}
