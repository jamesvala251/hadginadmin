import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IDisableAccountRequest } from 'app/shared/model/disable-account-request.model';
import { DisableAccountRequestService } from './disable-account-request.service';
import { DisableAccountRequestDeleteDialogComponent } from './disable-account-request-delete-dialog.component';
import { AccountService } from 'app/core/auth/account.service';

@Component({
  selector: 'jhi-disable-account-request',
  templateUrl: './disable-account-request.component.html',
})
export class DisableAccountRequestComponent implements OnInit, OnDestroy {
  disableAccountRequests?: IDisableAccountRequest[];
  eventSubscriber?: Subscription;
  userId = '';
  isAdminUser = false;

  constructor(
    // private accountService: AccountService,
    protected disableAccountRequestService: DisableAccountRequestService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.disableAccountRequestService
      .query()
      .subscribe((res: HttpResponse<IDisableAccountRequest[]>) => (this.disableAccountRequests = res.body || []));
  }

  loadByUserId(): void {
    this.disableAccountRequestService
      .findByUserId(this.userId)
      .subscribe((res: HttpResponse<IDisableAccountRequest[]>) => (this.disableAccountRequests = res.body || []));
  }

  ngOnInit(): void {
    // this.accountService.identity().subscribe(account => {
    //   if (account) {
    //     this.userId = account.login;
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
    this.registerChangeInDisableAccountRequests();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IDisableAccountRequest): string {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInDisableAccountRequests(): void {
    this.eventSubscriber = this.eventManager.subscribe('disableAccountRequestListModification', () => this.loadAll());
  }

  delete(disableAccountRequest: IDisableAccountRequest): void {
    const modalRef = this.modalService.open(DisableAccountRequestDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.disableAccountRequest = disableAccountRequest;
  }
}
