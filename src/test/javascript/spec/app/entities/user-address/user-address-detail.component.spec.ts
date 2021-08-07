import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { UserManagementFeTestModule } from '../../../test.module';
import { UserAddressDetailComponent } from 'app/entities/user-address/user-address-detail.component';
import { UserAddress } from 'app/shared/model/user-address.model';

describe('Component Tests', () => {
  describe('UserAddress Management Detail Component', () => {
    let comp: UserAddressDetailComponent;
    let fixture: ComponentFixture<UserAddressDetailComponent>;
    const route = ({ data: of({ userAddress: new UserAddress('123') }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [UserManagementFeTestModule],
        declarations: [UserAddressDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(UserAddressDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(UserAddressDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load userAddress on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.userAddress).toEqual(jasmine.objectContaining({ id: '123' }));
      });
    });
  });
});
