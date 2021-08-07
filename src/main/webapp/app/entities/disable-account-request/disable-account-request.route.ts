import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IDisableAccountRequest, DisableAccountRequest } from 'app/shared/model/disable-account-request.model';
import { DisableAccountRequestService } from './disable-account-request.service';
import { DisableAccountRequestComponent } from './disable-account-request.component';
import { DisableAccountRequestDetailComponent } from './disable-account-request-detail.component';
import { DisableAccountRequestUpdateComponent } from './disable-account-request-update.component';
import { DETAIL, NEW, EDIT } from 'app/shared/constants/breadcrumb.constants';

@Injectable({ providedIn: 'root' })
export class DisableAccountRequestResolve implements Resolve<IDisableAccountRequest> {
  constructor(private service: DisableAccountRequestService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IDisableAccountRequest> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((disableAccountRequest: HttpResponse<DisableAccountRequest>) => {
          if (disableAccountRequest.body) {
            return of(disableAccountRequest.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new DisableAccountRequest());
  }
}

export const disableAccountRequestRoute: Routes = [
  {
    path: '',
    component: DisableAccountRequestComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'userManagementFeApp.disableAccountRequest.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: DisableAccountRequestDetailComponent,
    resolve: {
      disableAccountRequest: DisableAccountRequestResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'userManagementFeApp.disableAccountRequest.home.title',
      breadcrumb: DETAIL,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: DisableAccountRequestUpdateComponent,
    resolve: {
      disableAccountRequest: DisableAccountRequestResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'userManagementFeApp.disableAccountRequest.home.title',
      breadcrumb: NEW,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: DisableAccountRequestUpdateComponent,
    resolve: {
      disableAccountRequest: DisableAccountRequestResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'userManagementFeApp.disableAccountRequest.home.title',
      breadcrumb: EDIT,
    },
    canActivate: [UserRouteAccessService],
  },
];
