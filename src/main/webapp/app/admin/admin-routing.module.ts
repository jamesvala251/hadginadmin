import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { USERS, AUDITS, COFIGURATION, DOCS, HEALTH, LOGS, METRICS, ENTITY_AUDIT } from 'app/shared/constants/breadcrumb.constants';
/* jhipster-needle-add-admin-module-import - JHipster will add admin modules imports here */

@NgModule({
  imports: [
    /* jhipster-needle-add-admin-module - JHipster will add admin modules here */
    RouterModule.forChild([
      {
        path: 'user-management',
        loadChildren: () => import('./user-management/user-management.module').then(m => m.UserManagementModule),
        data: {
          pageTitle: 'userManagement.home.title',
          breadcrumb: USERS,
        },
      },
      {
        path: 'audits',
        loadChildren: () => import('./audits/audits.module').then(m => m.AuditsModule),
        data: {
          breadcrumb: AUDITS,
        },
      },
      {
        path: 'configuration',
        loadChildren: () => import('./configuration/configuration.module').then(m => m.ConfigurationModule),
        data: {
          breadcrumb: COFIGURATION,
        },
      },
      {
        path: 'docs',
        loadChildren: () => import('./docs/docs.module').then(m => m.DocsModule),
        data: {
          breadcrumb: DOCS,
        },
      },
      {
        path: 'health',
        loadChildren: () => import('./health/health.module').then(m => m.HealthModule),
        data: {
          breadcrumb: HEALTH,
        },
      },
      {
        path: 'logs',
        loadChildren: () => import('./logs/logs.module').then(m => m.LogsModule),
        data: {
          breadcrumb: LOGS,
        },
      },
      {
        path: 'metrics',
        loadChildren: () => import('./metrics/metrics.module').then(m => m.MetricsModule),
        data: {
          breadcrumb: METRICS,
        },
      },
      {
        path: 'entity-audit',
        loadChildren: () => import('./entity-audit/entity-audit.module').then(m => m.EntityAuditModule),
        data: {
          breadcrumb: ENTITY_AUDIT,
        },
      },
      /* jhipster-needle-add-admin-route - JHipster will add admin routes here */
    ]),
  ],
})
export class AdminRoutingModule {}
