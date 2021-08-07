import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { UserManagementFeTestModule } from '../../../test.module';
import { UserContactsDetailComponent } from 'app/entities/user-contacts/user-contacts-detail.component';
import { UserContacts } from 'app/shared/model/user-contacts.model';

describe('Component Tests', () => {
  describe('UserContacts Management Detail Component', () => {
    let comp: UserContactsDetailComponent;
    let fixture: ComponentFixture<UserContactsDetailComponent>;
    const route = ({ data: of({ userContacts: new UserContacts('123') }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [UserManagementFeTestModule],
        declarations: [UserContactsDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(UserContactsDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(UserContactsDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load userContacts on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.userContacts).toEqual(jasmine.objectContaining({ id: '123' }));
      });
    });
  });
});
