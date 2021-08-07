import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IUserGroup } from 'app/shared/model/user-group.model';
import { UserGroupService } from './user-group.service';
import { UserGroupDeleteDialogComponent } from './user-group-delete-dialog.component';

@Component({
  selector: 'jhi-user-group',
  templateUrl: './user-group.component.html',
})
export class UserGroupComponent implements OnInit, OnDestroy {
  userGroups?: IUserGroup[];
  eventSubscriber?: Subscription;

  constructor(protected userGroupService: UserGroupService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.userGroupService.query().subscribe((res: HttpResponse<IUserGroup[]>) => (this.userGroups = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInUserGroups();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IUserGroup): string {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInUserGroups(): void {
    this.eventSubscriber = this.eventManager.subscribe('userGroupListModification', () => this.loadAll());
  }

  delete(userGroup: IUserGroup): void {
    const modalRef = this.modalService.open(UserGroupDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.userGroup = userGroup;
  }
}
