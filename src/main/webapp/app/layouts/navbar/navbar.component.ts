import { Component, OnInit, OnDestroy } from '@angular/core';
import { JhiLanguageService, JhiEventManager } from 'ng-jhipster';
import { SessionStorageService } from 'ngx-webstorage';

import { VERSION } from 'app/app.constants';
import { LANGUAGES } from 'app/core/language/language.constants';
import { AccountService } from 'app/core/auth/account.service';
import { LoginModalService } from 'app/core/login/login-modal.service';
import { LoginService } from 'app/core/login/login.service';
import { ProfileService } from 'app/layouts/profiles/profile.service';
import { Account } from 'app/core/user/account.model';
import { ProfilePictureService } from 'app/account/settings/profile-picture.service';
import { IProfilePicture } from 'app/shared/model/profile-picture.model';
import { HttpResponse } from '@angular/common/http';
import { NotificationService } from 'app/entities/notification/notification.service';
import { Subscription } from 'rxjs';
import { INotification } from 'app/shared/model/notification.model';
import { ViewStatus } from 'app/shared/model/enumerations/view-status.model';
@Component({
  selector: 'jhi-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['navbar.scss'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  inProduction?: boolean;
  isNavbarCollapsed = true;
  languages = LANGUAGES;
  swaggerEnabled?: boolean;
  version: string;
  account!: Account;
  pictureProfile: IProfilePicture | null = null;
  isAdminUser = false;
  notifications?: INotification[];
  unReadNotificationCount = 0;
  eventSubscriber?: Subscription;

  constructor(
    private loginService: LoginService,
    private languageService: JhiLanguageService,
    private sessionStorage: SessionStorageService,
    // private accountService: AccountService,
    private loginModalService: LoginModalService,
    private profileService: ProfileService,
    private profilePictureService: ProfilePictureService,
    protected notificationService: NotificationService,
    protected eventManager: JhiEventManager
  ) {
    this.version = VERSION ? (VERSION.toLowerCase().startsWith('v') ? VERSION : 'v' + VERSION) : '';
  }

  ngOnInit(): void {
    this.profileService.getProfileInfo().subscribe(profileInfo => {
      this.inProduction = profileInfo.inProduction;
      this.swaggerEnabled = profileInfo.swaggerEnabled;
    });

    // this.accountService.identity().subscribe(account => {
    //   if (account) {
    //     this.account = account;
    //     this.loadPictureByUserId();
    //     this.subscribeForProfilePictureChange();
    //     if (account.authorities.some((authorities: string) => authorities === 'ROLE_ADMIN')) {
    //       this.isAdminUser = true;
    //     }
    //     this.getNotifications();
    //     this.registerChangeInNotifications();
    //   }
    // });
  }

  changeLanguage(languageKey: string): void {
    this.sessionStorage.store('locale', languageKey);
    this.languageService.changeLanguage(languageKey);
  }

  collapseNavbar(): void {
    this.isNavbarCollapsed = true;
  }

  isAuthenticated(): boolean {
    return true;
  }

  login(): void {
    this.loginModalService.open();
  }

  logout(): void {
    this.collapseNavbar();
    this.loginService.logout();
  }

  toggleNavbar(): void {
    this.isNavbarCollapsed = !this.isNavbarCollapsed;
  }

  getImageUrl(): string {
    return '';
  }

  loadPictureByUserId(): void {
    if (this.account && this.account.email) {
      this.profilePictureService.findByUserId(this.account.email).subscribe((res: HttpResponse<IProfilePicture>) => {
        this.pictureProfile = res.body || null;
      });
    }
  }

  subscribeForProfilePictureChange(): void {
    this.profilePictureService.subscribeForNewProfilePictureChange().subscribe((res: IProfilePicture | null) => {
      this.pictureProfile = res;
    });
  }

  loadAll(): void {
    this.notificationService.query().subscribe((res: HttpResponse<INotification[]>) => this.manageNotification(res));
  }

  loadByUserId(): void {
    this.notificationService
      .findByUserId(this.account?.email)
      .subscribe((res: HttpResponse<INotification[]>) => this.manageNotification(res));
  }

  registerChangeInNotifications(): void {
    this.eventSubscriber = this.eventManager.subscribe('notificationListModification', () => {
      this.getNotifications();
    });
  }

  getNotifications(): void {
    if (this.isAdminUser) {
      this.loadAll();
    } else {
      this.loadByUserId();
    }
  }

  manageNotification(res: HttpResponse<INotification[]>): void {
    this.notifications = res.body || [];
    if (this.notifications.length > 0) {
      this.unReadNotificationCount = this.notifications.filter(notification => (notification.status = ViewStatus.UNREAD)).length;
      this.notifications.reverse();
      this.notifications = this.notifications.slice(0, 3);
    }
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }
}
