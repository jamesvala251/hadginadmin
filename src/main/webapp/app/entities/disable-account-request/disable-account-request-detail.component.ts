import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IDisableAccountRequest } from 'app/shared/model/disable-account-request.model';

@Component({
  selector: 'jhi-disable-account-request-detail',
  templateUrl: './disable-account-request-detail.component.html',
})
export class DisableAccountRequestDetailComponent implements OnInit {
  disableAccountRequest: IDisableAccountRequest | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ disableAccountRequest }) => (this.disableAccountRequest = disableAccountRequest));
  }

  previousState(): void {
    window.history.back();
  }
}
