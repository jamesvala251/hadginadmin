import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { UserManagementFeTestModule } from '../../../test.module';
import { UserContactsComponent } from 'app/entities/user-contacts/user-contacts.component';
import { UserContactsService } from 'app/entities/user-contacts/user-contacts.service';
import { UserContacts } from 'app/shared/model/user-contacts.model';

describe('Component Tests', () => {
  describe('UserContacts Management Component', () => {
    let comp: UserContactsComponent;
    let fixture: ComponentFixture<UserContactsComponent>;
    let service: UserContactsService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [UserManagementFeTestModule],
        declarations: [UserContactsComponent],
      })
        .overrideTemplate(UserContactsComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(UserContactsComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(UserContactsService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new UserContacts('123')],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.userContacts && comp.userContacts[0]).toEqual(jasmine.objectContaining({ id: '123' }));
    });
  });
});
