import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IUserContacts, UserContacts } from 'app/shared/model/user-contacts.model';
import { UserContactsService } from './user-contacts.service';
import { UserContactsComponent } from './user-contacts.component';
import { UserContactsDetailComponent } from './user-contacts-detail.component';
import { UserContactsUpdateComponent } from './user-contacts-update.component';
import { DETAIL, NEW, EDIT } from 'app/shared/constants/breadcrumb.constants';

@Injectable({ providedIn: 'root' })
export class UserContactsResolve implements Resolve<IUserContacts> {
  constructor(private service: UserContactsService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IUserContacts> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((userContacts: HttpResponse<UserContacts>) => {
          if (userContacts.body) {
            return of(userContacts.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new UserContacts());
  }
}

export const userContactsRoute: Routes = [
  {
    path: '',
    component: UserContactsComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'userManagementFeApp.userContacts.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: UserContactsDetailComponent,
    resolve: {
      userContacts: UserContactsResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'userManagementFeApp.userContacts.home.title',
      breadcrumb: DETAIL,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: UserContactsUpdateComponent,
    resolve: {
      userContacts: UserContactsResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'userManagementFeApp.userContacts.home.title',
      breadcrumb: NEW,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: UserContactsUpdateComponent,
    resolve: {
      userContacts: UserContactsResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'userManagementFeApp.userContacts.home.title',
      breadcrumb: EDIT,
    },
    canActivate: [UserRouteAccessService],
  },
];
