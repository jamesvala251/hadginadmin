import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IUserAddress } from 'app/shared/model/user-address.model';

@Component({
  selector: 'jhi-user-address-detail',
  templateUrl: './user-address-detail.component.html',
})
export class UserAddressDetailComponent implements OnInit {
  userAddress: IUserAddress | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ userAddress }) => (this.userAddress = userAddress));
  }

  previousState(): void {
    window.history.back();
  }
}
