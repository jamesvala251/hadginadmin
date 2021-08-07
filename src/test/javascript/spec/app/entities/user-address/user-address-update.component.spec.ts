import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { UserManagementFeTestModule } from '../../../test.module';
import { UserAddressUpdateComponent } from 'app/entities/user-address/user-address-update.component';
import { UserAddressService } from 'app/entities/user-address/user-address.service';
import { UserAddress } from 'app/shared/model/user-address.model';

describe('Component Tests', () => {
  describe('UserAddress Management Update Component', () => {
    let comp: UserAddressUpdateComponent;
    let fixture: ComponentFixture<UserAddressUpdateComponent>;
    let service: UserAddressService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [UserManagementFeTestModule],
        declarations: [UserAddressUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(UserAddressUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(UserAddressUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(UserAddressService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new UserAddress('123');
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new UserAddress();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
