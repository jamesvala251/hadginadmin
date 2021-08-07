import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IUserAddress, UserAddress } from 'app/shared/model/user-address.model';
import { UserAddressService } from './user-address.service';
import { AccountService } from 'app/core/auth/account.service';
import { ICountry } from 'app/shared/model/country.model';
import { IState } from 'app/shared/model/state.model';
import { CountryService } from '../country/country.service';
import { StateService } from '../state/state.service';
type SelectableEntity = ICountry | IState;

@Component({
  selector: 'jhi-user-address-update',
  templateUrl: './user-address-update.component.html',
})
export class UserAddressUpdateComponent implements OnInit {
  isSaving = false;
  userId = '';
  countries: ICountry[] = [];
  states: IState[] = [];

  editForm = this.fb.group({
    id: [],
    userId: [null, [Validators.required]],
    address: [null, [Validators.required]],
    city: [null, [Validators.required]],
    country: [],
    state: [],
    zipcode: [null, [Validators.required]],
    addressType: [],
  });

  constructor(
    // private accountService: AccountService,
    protected userAddressService: UserAddressService,
    protected countryService: CountryService,
    protected stateService: StateService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    // this.accountService.identity().subscribe(account => {
    //   if (account) {
    //     this.userId = account.login;
    //   }
    // });
    this.activatedRoute.data.subscribe(({ userAddress }) => {
      this.updateForm(userAddress);
      this.getStates();
      this.countryService.query().subscribe((res: HttpResponse<ICountry[]>) => (this.countries = res.body || []));
    });
  }

  updateForm(userAddress: IUserAddress): void {
    this.editForm.patchValue({
      id: userAddress.id,
      userId: this.userId,
      address: userAddress.address,
      city: userAddress.city,
      state: userAddress.state,
      country: userAddress.country,
      zipcode: userAddress.zipcode,
      addressType: userAddress.addressType,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const userAddress = this.createFromForm();
    if (userAddress.id !== undefined) {
      this.subscribeToSaveResponse(this.userAddressService.update(userAddress));
    } else {
      this.subscribeToSaveResponse(this.userAddressService.create(userAddress));
    }
  }

  getStates(): void {
    const value = this.editForm.get(['country'])!.value;
    if (value && value.id) {
      this.stateService.findByCountry(value.id).subscribe((res: HttpResponse<IState[]>) => (this.states = res.body || []));
    }
  }

  private createFromForm(): IUserAddress {
    return {
      ...new UserAddress(),
      id: this.editForm.get(['id'])!.value,
      userId: this.editForm.get(['userId'])!.value,
      address: this.editForm.get(['address'])!.value,
      city: this.editForm.get(['city'])!.value,
      country: this.editForm.get(['country'])!.value,
      state: this.editForm.get(['state'])!.value,
      zipcode: this.editForm.get(['zipcode'])!.value,
      addressType: this.editForm.get(['addressType'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IUserAddress>>): void {
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

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }
}
