import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { UserManagementFeTestModule } from '../../../test.module';
import { UserGroupComponent } from 'app/entities/user-group/user-group.component';
import { UserGroupService } from 'app/entities/user-group/user-group.service';
import { UserGroup } from 'app/shared/model/user-group.model';

describe('Component Tests', () => {
  describe('UserGroup Management Component', () => {
    let comp: UserGroupComponent;
    let fixture: ComponentFixture<UserGroupComponent>;
    let service: UserGroupService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [UserManagementFeTestModule],
        declarations: [UserGroupComponent],
      })
        .overrideTemplate(UserGroupComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(UserGroupComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(UserGroupService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new UserGroup('123')],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.userGroups && comp.userGroups[0]).toEqual(jasmine.objectContaining({ id: '123' }));
    });
  });
});
