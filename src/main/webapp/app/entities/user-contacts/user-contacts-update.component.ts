import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IUserContacts, UserContacts } from 'app/shared/model/user-contacts.model';
import { UserContactsService } from './user-contacts.service';
import { AccountService } from 'app/core/auth/account.service';
import { ICountry } from 'app/shared/model/country.model';
import { IState } from 'app/shared/model/state.model';
import { CountryService } from '../country/country.service';
import { StateService } from '../state/state.service';
type SelectableEntity = ICountry | IState;

@Component({
  selector: 'jhi-user-contacts-update',
  templateUrl: './user-contacts-update.component.html',
})
export class UserContactsUpdateComponent implements OnInit {
  isSaving = false;
  userId = '';
  countries: ICountry[] = [];
  states: IState[] = [];

  editForm = this.fb.group({
    id: [],
    userId: [null, [Validators.required]],
    name: [null, [Validators.required]],
    relation: [null, [Validators.required]],
    phoneNumber: [null, [Validators.required]],
    email: [],
    address: [null, [Validators.required]],
    city: [null, [Validators.required]],
    country: [],
    state: [],
    zipCode: [null, [Validators.required]],
  });

  constructor(
    // private accountService: AccountService,
    protected userContactsService: UserContactsService,
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
    this.activatedRoute.data.subscribe(({ userContacts }) => {
      this.updateForm(userContacts);
      this.getStates();
      this.countryService.query().subscribe((res: HttpResponse<ICountry[]>) => (this.countries = res.body || []));
    });
  }

  updateForm(userContacts: IUserContacts): void {
    this.editForm.patchValue({
      id: userContacts.id,
      userId: this.userId,
      name: userContacts.name,
      relation: userContacts.relation,
      phoneNumber: userContacts.phoneNumber,
      email: userContacts.email,
      address: userContacts.address,
      city: userContacts.city,
      state: userContacts.state,
      country: userContacts.country,
      zipCode: userContacts.zipCode,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const userContacts = this.createFromForm();
    if (userContacts.id !== undefined) {
      this.subscribeToSaveResponse(this.userContactsService.update(userContacts));
    } else {
      this.subscribeToSaveResponse(this.userContactsService.create(userContacts));
    }
  }

  getStates(): void {
    const value = this.editForm.get(['country'])!.value;
    if (value && value.id) {
      this.stateService.findByCountry(value.id).subscribe((res: HttpResponse<IState[]>) => (this.states = res.body || []));
    }
  }

  private createFromForm(): IUserContacts {
    return {
      ...new UserContacts(),
      id: this.editForm.get(['id'])!.value,
      userId: this.editForm.get(['userId'])!.value,
      name: this.editForm.get(['name'])!.value,
      relation: this.editForm.get(['relation'])!.value,
      phoneNumber: this.editForm.get(['phoneNumber'])!.value,
      email: this.editForm.get(['email'])!.value,
      address: this.editForm.get(['address'])!.value,
      city: this.editForm.get(['city'])!.value,
      state: this.editForm.get(['state'])!.value,
      country: this.editForm.get(['country'])!.value,
      zipCode: this.editForm.get(['zipCode'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IUserContacts>>): void {
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
