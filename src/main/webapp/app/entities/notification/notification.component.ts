import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { INotification } from 'app/shared/model/notification.model';
import { NotificationService } from './notification.service';
import { NotificationDeleteDialogComponent } from './notification-delete-dialog.component';
import { AccountService } from 'app/core/auth/account.service';

@Component({
  selector: 'jhi-notification',
  templateUrl: './notification.component.html',
})
export class NotificationComponent implements OnInit, OnDestroy {
  notifications?: INotification[];
  eventSubscriber?: Subscription;
  userId = '';
  isAdminUser = false;

  constructor(
    // private accountService: AccountService,
    protected notificationService: NotificationService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.notificationService.query().subscribe((res: HttpResponse<INotification[]>) => (this.notifications = res.body || []));
  }

  loadByUserId(): void {
    this.notificationService
      .findByUserId(this.userId)
      .subscribe((res: HttpResponse<INotification[]>) => (this.notifications = res.body || []));
  }

  ngOnInit(): void {
    // this.accountService.identity().subscribe(account => {
    //   if (account) {
    //     this.userId = account.email;
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
    this.registerChangeInNotifications();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: INotification): string {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInNotifications(): void {
    this.eventSubscriber = this.eventManager.subscribe('notificationListModification', () => {
      if (this.isAdminUser) {
        this.loadAll();
      } else {
        this.loadByUserId();
      }
    });
  }

  delete(notification: INotification): void {
    const modalRef = this.modalService.open(NotificationDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.notification = notification;
  }
}
