import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ICommunicationChannel, CommunicationChannel } from 'app/shared/model/communication-channel.model';
import { CommunicationChannelService } from './communication-channel.service';
import { CommunicationChannelComponent } from './communication-channel.component';
import { CommunicationChannelDetailComponent } from './communication-channel-detail.component';
import { CommunicationChannelUpdateComponent } from './communication-channel-update.component';
import { DETAIL, NEW, EDIT } from 'app/shared/constants/breadcrumb.constants';

@Injectable({ providedIn: 'root' })
export class CommunicationChannelResolve implements Resolve<ICommunicationChannel> {
  constructor(private service: CommunicationChannelService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICommunicationChannel> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((communicationChannel: HttpResponse<CommunicationChannel>) => {
          if (communicationChannel.body) {
            return of(communicationChannel.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new CommunicationChannel());
  }
}

export const communicationChannelRoute: Routes = [
  {
    path: '',
    component: CommunicationChannelComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'userManagementFeApp.communicationChannel.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: CommunicationChannelDetailComponent,
    resolve: {
      communicationChannel: CommunicationChannelResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'userManagementFeApp.communicationChannel.home.title',
      breadcrumb: DETAIL,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: CommunicationChannelUpdateComponent,
    resolve: {
      communicationChannel: CommunicationChannelResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'userManagementFeApp.communicationChannel.home.title',
      breadcrumb: NEW,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: CommunicationChannelUpdateComponent,
    resolve: {
      communicationChannel: CommunicationChannelResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'userManagementFeApp.communicationChannel.home.title',
      breadcrumb: EDIT,
    },
    canActivate: [UserRouteAccessService],
  },
];
