import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IUserContacts } from 'app/shared/model/user-contacts.model';

@Component({
  selector: 'jhi-user-contacts-detail',
  templateUrl: './user-contacts-detail.component.html',
})
export class UserContactsDetailComponent implements OnInit {
  userContacts: IUserContacts | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ userContacts }) => (this.userContacts = userContacts));
  }

  previousState(): void {
    window.history.back();
  }
}
