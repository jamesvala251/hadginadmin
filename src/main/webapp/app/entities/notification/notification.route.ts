import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { INotification, Notification } from 'app/shared/model/notification.model';
import { NotificationService } from './notification.service';
import { NotificationComponent } from './notification.component';
import { NotificationDetailComponent } from './notification-detail.component';
import { NotificationUpdateComponent } from './notification-update.component';
import { DETAIL, NEW, EDIT } from 'app/shared/constants/breadcrumb.constants';

@Injectable({ providedIn: 'root' })
export class NotificationResolve implements Resolve<INotification> {
  constructor(private service: NotificationService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<INotification> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((notification: HttpResponse<Notification>) => {
          if (notification.body) {
            return of(notification.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Notification());
  }
}

export const notificationRoute: Routes = [
  {
    path: '',
    component: NotificationComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'userManagementFeApp.notification.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: NotificationDetailComponent,
    resolve: {
      notification: NotificationResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'userManagementFeApp.notification.home.title',
      breadcrumb: DETAIL,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: NotificationUpdateComponent,
    resolve: {
      notification: NotificationResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'userManagementFeApp.notification.home.title',
      breadcrumb: NEW,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: NotificationUpdateComponent,
    resolve: {
      notification: NotificationResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'userManagementFeApp.notification.home.title',
      breadcrumb: EDIT,
    },
    canActivate: [UserRouteAccessService],
  },
];
