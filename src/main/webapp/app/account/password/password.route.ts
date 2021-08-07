import { Route } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { PasswordComponent } from './password.component';
import { Authority } from 'app/shared/constants/authority.constants';
import { PASSWORD } from 'app/shared/constants/breadcrumb.constants';

export const passwordRoute: Route = {
  path: 'password',
  component: PasswordComponent,
  data: {
    authorities: [Authority.USER],
    pageTitle: 'global.menu.account.password',
    breadcrumb: PASSWORD,
  },
  canActivate: [UserRouteAccessService],
};
