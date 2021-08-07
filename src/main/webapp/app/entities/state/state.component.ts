import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IState } from 'app/shared/model/state.model';
import { StateService } from './state.service';
import { StateDeleteDialogComponent } from './state-delete-dialog.component';

@Component({
  selector: 'jhi-state',
  templateUrl: './state.component.html',
})
export class StateComponent implements OnInit, OnDestroy {
  states?: IState[];
  eventSubscriber?: Subscription;

  constructor(protected stateService: StateService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.stateService.query().subscribe((res: HttpResponse<IState[]>) => (this.states = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInStates();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IState): string {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInStates(): void {
    this.eventSubscriber = this.eventManager.subscribe('stateListModification', () => this.loadAll());
  }

  delete(state: IState): void {
    const modalRef = this.modalService.open(StateDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.state = state;
  }
}
