import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import './vendor';
import { UserManagementFeSharedModule } from 'app/shared/shared.module';
import { UserManagementFeCoreModule } from 'app/core/core.module';
import { UserManagementFeAppRoutingModule } from './app-routing.module';
import { UserManagementFeEntityModule } from './entities/entity.module';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { MainComponent } from './layouts/main/main.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { PageRibbonComponent } from './layouts/profiles/page-ribbon.component';
import { ActiveMenuDirective } from './layouts/navbar/active-menu.directive';
import { ErrorComponent } from './layouts/error/error.component';
import { SidebarComponent } from './layouts/sidebar/sidebar.component';
import { DateTimeAgoPipe } from './layouts/navbar/date-time-ago-pipe';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { BreadcrumbComponent } from './layouts/breadcrumb/breadcrumb.component';

@NgModule({
  imports: [
    BrowserModule,
    UserManagementFeSharedModule,
    UserManagementFeCoreModule,
    // jhipster-needle-angular-add-module JHipster will add new module here
    UserManagementFeEntityModule,
    UserManagementFeAppRoutingModule,
  ],
  declarations: [
    MainComponent,
    SidebarComponent,
    NavbarComponent,
    ErrorComponent,
    PageRibbonComponent,
    ActiveMenuDirective,
    FooterComponent,
    BreadcrumbComponent,
    DateTimeAgoPipe,
  ],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }],
  bootstrap: [MainComponent],
})
export class UserManagementFeAppModule {}
