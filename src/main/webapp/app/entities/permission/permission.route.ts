import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IPermission, Permission } from 'app/shared/model/permission.model';
import { PermissionService } from './permission.service';
import { PermissionComponent } from './permission.component';
import { PermissionDetailComponent } from './permission-detail.component';
import { PermissionUpdateComponent } from './permission-update.component';
import { DETAIL, NEW, EDIT } from 'app/shared/constants/breadcrumb.constants';

@Injectable({ providedIn: 'root' })
export class PermissionResolve implements Resolve<IPermission> {
  constructor(private service: PermissionService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IPermission> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((permission: HttpResponse<Permission>) => {
          if (permission.body) {
            return of(permission.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Permission());
  }
}

export const permissionRoute: Routes = [
  {
    path: '',
    component: PermissionComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'userManagementFeApp.permission.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: PermissionDetailComponent,
    resolve: {
      permission: PermissionResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'userManagementFeApp.permission.home.title',
      breadcrumb: DETAIL,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: PermissionUpdateComponent,
    resolve: {
      permission: PermissionResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'userManagementFeApp.permission.home.title',
      breadcrumb: NEW,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: PermissionUpdateComponent,
    resolve: {
      permission: PermissionResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'userManagementFeApp.permission.home.title',
      breadcrumb: EDIT,
    },
    canActivate: [UserRouteAccessService],
  },
];
