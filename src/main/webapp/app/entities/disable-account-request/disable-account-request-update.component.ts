import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IDisableAccountRequest, DisableAccountRequest } from 'app/shared/model/disable-account-request.model';
import { DisableAccountRequestService } from './disable-account-request.service';
import { AccountService } from 'app/core/auth/account.service';
import { Account } from 'app/core/user/account.model';

@Component({
  selector: 'jhi-disable-account-request-update',
  templateUrl: './disable-account-request-update.component.html',
})
export class DisableAccountRequestUpdateComponent implements OnInit {
  isSaving = false;
  account: Account | null = null;

  editForm = this.fb.group({
    id: [],
    userId: [],
    reason: [null, [Validators.required]],
    status: [],
    createdDate: [],
    updatedDate: [],
    updatedBy: [],
  });

  constructor(
    protected disableAccountRequestService: DisableAccountRequestService,
    private accountService: AccountService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.accountService.identity().subscribe(account => (this.account = account));
    this.activatedRoute.data.subscribe(({ disableAccountRequest }) => {
      this.updateForm(disableAccountRequest);
      this.updateForm(disableAccountRequest);
    });
  }

  updateForm(disableAccountRequest: IDisableAccountRequest): void {
    this.editForm.patchValue({
      id: disableAccountRequest.id,
      userId: disableAccountRequest.userId,
      reason: disableAccountRequest.reason,
      status: disableAccountRequest.status,
      updatedBy: this.account?.email,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const disableAccountRequest = this.createFromForm();
    if (disableAccountRequest.id !== undefined) {
      this.subscribeToSaveResponse(this.disableAccountRequestService.update(disableAccountRequest));
    } else {
      this.subscribeToSaveResponse(this.disableAccountRequestService.create(disableAccountRequest));
    }
  }

  private createFromForm(): IDisableAccountRequest {
    return {
      ...new DisableAccountRequest(),
      id: this.editForm.get(['id'])!.value,
      reason: this.editForm.get(['reason'])!.value,
      status: this.editForm.get(['status'])!.value,
      userId: this.account?.email,
      updatedBy: this.account?.email,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDisableAccountRequest>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }
}
