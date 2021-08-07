import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  ROLE,
  USER_GROUP,
  PERMISSION,
  USER_ADDRESS,
  USER_CONTACTS,
  MESSAGE_QUEUE_TOPIC,
  COMMUNICATION_CHANNEL,
  NOTIFICATION,
  COUNTRY,
  STATE,
  DISABLE_ACCOUNT_REQUEST,
} from 'app/shared/constants/breadcrumb.constants';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'role',
        loadChildren: () => import('./role/role.module').then(m => m.UserManagementFeRoleModule),
        data: {
          breadcrumb: ROLE,
        },
      },
      {
        path: 'user-group',
        loadChildren: () => import('./user-group/user-group.module').then(m => m.UserManagementFeUserGroupModule),
        data: {
          breadcrumb: USER_GROUP,
        },
      },
      {
        path: 'permission',
        loadChildren: () => import('./permission/permission.module').then(m => m.UserManagementFePermissionModule),
        data: {
          breadcrumb: PERMISSION,
        },
      },
      {
        path: 'user-address',
        loadChildren: () => import('./user-address/user-address.module').then(m => m.UserManagementFeUserAddressModule),
        data: {
          breadcrumb: USER_ADDRESS,
        },
      },
      {
        path: 'user-contacts',
        loadChildren: () => import('./user-contacts/user-contacts.module').then(m => m.UserManagementFeUserContactsModule),
        data: {
          breadcrumb: USER_CONTACTS,
        },
      },
      {
        path: 'message-queue-topic',
        loadChildren: () => import('./message-queue-topic/message-queue-topic.module').then(m => m.UserManagementFeMessageQueueTopicModule),
        data: {
          breadcrumb: MESSAGE_QUEUE_TOPIC,
        },
      },
      {
        path: 'communication-channel',
        loadChildren: () =>
          import('./communication-channel/communication-channel.module').then(m => m.UserManagementFeCommunicationChannelModule),
        data: {
          breadcrumb: COMMUNICATION_CHANNEL,
        },
      },
      {
        path: 'notification',
        loadChildren: () => import('./notification/notification.module').then(m => m.UserManagementFeNotificationModule),
        data: {
          breadcrumb: NOTIFICATION,
        },
      },
      {
        path: 'country',
        loadChildren: () => import('./country/country.module').then(m => m.UserManagementFeCountryModule),
        data: {
          breadcrumb: COUNTRY,
        },
      },
      {
        path: 'state',
        loadChildren: () => import('./state/state.module').then(m => m.UserManagementFeStateModule),
        data: {
          breadcrumb: STATE,
        },
      },
      {
        path: 'disable-account-request',
        loadChildren: () =>
          import('./disable-account-request/disable-account-request.module').then(m => m.UserManagementFeDisableAccountRequestModule),
        data: {
          breadcrumb: DISABLE_ACCOUNT_REQUEST,
        },
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class UserManagementFeEntityModule {}
