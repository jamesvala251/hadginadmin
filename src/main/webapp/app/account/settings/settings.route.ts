import { Route } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { SettingsComponent } from './settings.component';
import { Authority } from 'app/shared/constants/authority.constants';
import { SETTINGS } from 'app/shared/constants/breadcrumb.constants';

export const settingsRoute: Route = {
  path: 'settings',
  component: SettingsComponent,
  data: {
    authorities: [Authority.USER],
    pageTitle: 'global.menu.account.settings',
    breadcrumb: SETTINGS,
  },
  canActivate: [UserRouteAccessService],
};
