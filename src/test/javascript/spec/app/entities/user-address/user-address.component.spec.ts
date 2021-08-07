import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { UserManagementFeTestModule } from '../../../test.module';
import { UserAddressComponent } from 'app/entities/user-address/user-address.component';
import { UserAddressService } from 'app/entities/user-address/user-address.service';
import { UserAddress } from 'app/shared/model/user-address.model';

describe('Component Tests', () => {
  describe('UserAddress Management Component', () => {
    let comp: UserAddressComponent;
    let fixture: ComponentFixture<UserAddressComponent>;
    let service: UserAddressService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [UserManagementFeTestModule],
        declarations: [UserAddressComponent],
      })
        .overrideTemplate(UserAddressComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(UserAddressComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(UserAddressService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new UserAddress('123')],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.userAddresses && comp.userAddresses[0]).toEqual(jasmine.objectContaining({ id: '123' }));
    });
  });
});
