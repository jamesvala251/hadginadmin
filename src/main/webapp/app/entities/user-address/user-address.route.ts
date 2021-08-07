import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IUserAddress, UserAddress } from 'app/shared/model/user-address.model';
import { UserAddressService } from './user-address.service';
import { UserAddressComponent } from './user-address.component';
import { UserAddressDetailComponent } from './user-address-detail.component';
import { UserAddressUpdateComponent } from './user-address-update.component';
import { DETAIL, NEW, EDIT } from 'app/shared/constants/breadcrumb.constants';

@Injectable({ providedIn: 'root' })
export class UserAddressResolve implements Resolve<IUserAddress> {
  constructor(private service: UserAddressService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IUserAddress> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((userAddress: HttpResponse<UserAddress>) => {
          if (userAddress.body) {
            return of(userAddress.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new UserAddress());
  }
}

export const userAddressRoute: Routes = [
  {
    path: '',
    component: UserAddressComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'userManagementFeApp.userAddress.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: UserAddressDetailComponent,
    resolve: {
      userAddress: UserAddressResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'userManagementFeApp.userAddress.home.title',
      breadcrumb: DETAIL,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: UserAddressUpdateComponent,
    resolve: {
      userAddress: UserAddressResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'userManagementFeApp.userAddress.home.title',
      breadcrumb: NEW,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: UserAddressUpdateComponent,
    resolve: {
      userAddress: UserAddressResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'userManagementFeApp.userAddress.home.title',
      breadcrumb: EDIT,
    },
    canActivate: [UserRouteAccessService],
  },
];
