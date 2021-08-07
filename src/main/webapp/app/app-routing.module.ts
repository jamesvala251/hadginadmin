import { NgModule } from '@angular/core';
import { RouterModule, PreloadAllModules } from '@angular/router';
import { errorRoute } from './layouts/error/error.route';
import { navbarRoute } from './layouts/navbar/navbar.route';
import { sidebarRoute } from './layouts/sidebar/sidebar.route';
import { DEBUG_INFO_ENABLED } from 'app/app.constants';
import { Authority } from 'app/shared/constants/authority.constants';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { HOME } from './shared/constants/breadcrumb.constants';

const LAYOUT_ROUTES = [navbarRoute, sidebarRoute, ...errorRoute];

@NgModule({
  imports: [
    RouterModule.forRoot(
      [
        {
          path: '',
          children: [
            {
              path: '',
              redirectTo: 'home',
              pathMatch: 'full',
            },
            {
              path: 'login',
              loadChildren: () => import('./login/login-page.module').then(m => m.LoginPageModule),
            },
            {
              path: 'home',
              loadChildren: () => import('./home/home.module').then(m => m.UserManagementFeHomeModule),
              data: {
                breadcrumb: HOME,
              },
            },
          ],
        },
        {
          path: 'admin',
          data: {
            authorities: [Authority.ADMIN],
          },
          // canActivate: [UserRouteAccessService],
          loadChildren: () => import('./admin/admin-routing.module').then(m => m.AdminRoutingModule),
        },
        {
          path: 'account',
          loadChildren: () => import('./account/account.module').then(m => m.AccountModule),
        },
        ...LAYOUT_ROUTES,
      ],
      { enableTracing: DEBUG_INFO_ENABLED, preloadingStrategy: PreloadAllModules }
    ),
  ],
  exports: [RouterModule],
})
export class UserManagementFeAppRoutingModule {}
