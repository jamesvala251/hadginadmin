import { Component, OnInit, RendererFactory2, Renderer2 } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, NavigationEnd, NavigationError, ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

import { AccountService } from 'app/core/auth/account.service';
import { FindLanguageFromKeyPipe } from 'app/shared/language/find-language-from-key.pipe';

@Component({
  selector: 'jhi-main',
  templateUrl: './main.component.html',
})
export class MainComponent implements OnInit {
  private renderer: Renderer2;
  isSidebar = true;
  isHeader = true;

  constructor(
    // private accountService: AccountService,
    private titleService: Title,
    private router: Router,
    private findLanguageFromKeyPipe: FindLanguageFromKeyPipe,
    private translateService: TranslateService,
    rootRenderer: RendererFactory2,
    private route: ActivatedRoute
  ) {
    this.renderer = rootRenderer.createRenderer(document.querySelector('html'), null);
  }

  ngOnInit(): void {
    // try to log in automatically
    // this.accountService.identity().subscribe();

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.updateTitle();
        this.checkForSidebarAndHeader();
      }
      if (event instanceof NavigationError && event.error.status === 404) {
        this.router.navigate(['/404']);
      }
    });

    this.translateService.onLangChange.subscribe((langChangeEvent: LangChangeEvent) => {
      this.updateTitle();

      this.renderer.setAttribute(document.querySelector('html'), 'lang', langChangeEvent.lang);

      this.updatePageDirection();
    });
  }

  private getPageTitle(routeSnapshot: ActivatedRouteSnapshot): string {
    let title: string = routeSnapshot.data && routeSnapshot.data['pageTitle'] ? routeSnapshot.data['pageTitle'] : '';
    if (routeSnapshot.firstChild) {
      title = this.getPageTitle(routeSnapshot.firstChild) || title;
    }
    return title;
  }

  private updateTitle(): void {
    let pageTitle = this.getPageTitle(this.router.routerState.snapshot.root);
    if (!pageTitle) {
      pageTitle = 'global.title';
    }
    this.translateService.get(pageTitle).subscribe(title => this.titleService.setTitle(title));
  }

  private updatePageDirection(): void {
    this.renderer.setAttribute(
      document.querySelector('html'),
      'dir',
      this.findLanguageFromKeyPipe.isRTL(this.translateService.currentLang) ? 'rtl' : 'ltr'
    );
  }

  checkForSidebarAndHeader(): void {
    const routeData = this.getRouteData();
    if (routeData['isSidebar'] != null) {
      this.isSidebar = routeData['isSidebar'];
    } else {
      this.isSidebar = true;
    }

    if (routeData['isHeader'] != null) {
      this.isHeader = routeData['isHeader'];
    } else {
      this, (this.isHeader = true);
    }
  }

  getRouteData(): any {
    let child = this.route.firstChild;
    while (child) {
      if (child.firstChild) {
        child = child.firstChild;
      } else if (child.snapshot.data) {
        return child.snapshot.data;
      } else {
        return null;
      }
    }
  }

  isAuthenticated(): boolean {
    return true;
  }
}
