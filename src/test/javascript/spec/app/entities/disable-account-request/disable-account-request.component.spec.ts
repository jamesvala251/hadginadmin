import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { UserManagementFeTestModule } from '../../../test.module';
import { DisableAccountRequestComponent } from 'app/entities/disable-account-request/disable-account-request.component';
import { DisableAccountRequestService } from 'app/entities/disable-account-request/disable-account-request.service';
import { DisableAccountRequest } from 'app/shared/model/disable-account-request.model';

describe('Component Tests', () => {
  describe('DisableAccountRequest Management Component', () => {
    let comp: DisableAccountRequestComponent;
    let fixture: ComponentFixture<DisableAccountRequestComponent>;
    let service: DisableAccountRequestService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [UserManagementFeTestModule],
        declarations: [DisableAccountRequestComponent],
      })
        .overrideTemplate(DisableAccountRequestComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(DisableAccountRequestComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(DisableAccountRequestService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new DisableAccountRequest('123')],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.disableAccountRequests && comp.disableAccountRequests[0]).toEqual(jasmine.objectContaining({ id: '123' }));
    });
  });
});
