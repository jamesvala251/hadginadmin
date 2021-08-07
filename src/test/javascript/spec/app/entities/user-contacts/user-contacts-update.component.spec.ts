import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { UserManagementFeTestModule } from '../../../test.module';
import { UserContactsUpdateComponent } from 'app/entities/user-contacts/user-contacts-update.component';
import { UserContactsService } from 'app/entities/user-contacts/user-contacts.service';
import { UserContacts } from 'app/shared/model/user-contacts.model';

describe('Component Tests', () => {
  describe('UserContacts Management Update Component', () => {
    let comp: UserContactsUpdateComponent;
    let fixture: ComponentFixture<UserContactsUpdateComponent>;
    let service: UserContactsService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [UserManagementFeTestModule],
        declarations: [UserContactsUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(UserContactsUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(UserContactsUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(UserContactsService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new UserContacts('123');
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
        const entity = new UserContacts();
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
