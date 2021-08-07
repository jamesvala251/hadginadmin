import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IUserContacts } from 'app/shared/model/user-contacts.model';
import { UserContactsService } from './user-contacts.service';
import { UserContactsDeleteDialogComponent } from './user-contacts-delete-dialog.component';
import { AccountService } from 'app/core/auth/account.service';

@Component({
  selector: 'jhi-user-contacts',
  templateUrl: './user-contacts.component.html',
})
export class UserContactsComponent implements OnInit, OnDestroy {
  userContacts?: IUserContacts[];
  eventSubscriber?: Subscription;
  userId = '';
  isAdminUser = false;

  constructor(
    // private accountService: AccountService,
    protected userContactsService: UserContactsService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.userContactsService.query().subscribe((res: HttpResponse<IUserContacts[]>) => (this.userContacts = res.body || []));
  }

  loadByUserId(): void {
    this.userContactsService
      .findContactsByUserId(this.userId)
      .subscribe((res: HttpResponse<IUserContacts[]>) => (this.userContacts = res.body || []));
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
    this.registerChangeInUserContacts();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IUserContacts): string {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInUserContacts(): void {
    this.eventSubscriber = this.eventManager.subscribe('userContactsListModification', () => {
      if (this.isAdminUser) {
        this.loadAll();
      } else {
        this.loadByUserId();
      }
    });
  }

  delete(userContacts: IUserContacts): void {
    const modalRef = this.modalService.open(UserContactsDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.userContacts = userContacts;
  }
}
