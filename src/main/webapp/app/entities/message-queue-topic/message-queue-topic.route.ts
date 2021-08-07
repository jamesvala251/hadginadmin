import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IMessageQueueTopic, MessageQueueTopic } from 'app/shared/model/message-queue-topic.model';
import { MessageQueueTopicService } from './message-queue-topic.service';
import { MessageQueueTopicComponent } from './message-queue-topic.component';
import { MessageQueueTopicDetailComponent } from './message-queue-topic-detail.component';
import { MessageQueueTopicUpdateComponent } from './message-queue-topic-update.component';
import { DETAIL, NEW, EDIT } from 'app/shared/constants/breadcrumb.constants';

@Injectable({ providedIn: 'root' })
export class MessageQueueTopicResolve implements Resolve<IMessageQueueTopic> {
  constructor(private service: MessageQueueTopicService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IMessageQueueTopic> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((messageQueueTopic: HttpResponse<MessageQueueTopic>) => {
          if (messageQueueTopic.body) {
            return of(messageQueueTopic.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new MessageQueueTopic());
  }
}

export const messageQueueTopicRoute: Routes = [
  {
    path: '',
    component: MessageQueueTopicComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'userManagementFeApp.messageQueueTopic.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: MessageQueueTopicDetailComponent,
    resolve: {
      messageQueueTopic: MessageQueueTopicResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'userManagementFeApp.messageQueueTopic.home.title',
      breadcrumb: DETAIL,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: MessageQueueTopicUpdateComponent,
    resolve: {
      messageQueueTopic: MessageQueueTopicResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'userManagementFeApp.messageQueueTopic.home.title',
      breadcrumb: NEW,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: MessageQueueTopicUpdateComponent,
    resolve: {
      messageQueueTopic: MessageQueueTopicResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'userManagementFeApp.messageQueueTopic.home.title',
      breadcrumb: EDIT,
    },
    canActivate: [UserRouteAccessService],
  },
];
