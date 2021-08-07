import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { UserManagementFeTestModule } from '../../../test.module';
import { DisableAccountRequestUpdateComponent } from 'app/entities/disable-account-request/disable-account-request-update.component';
import { DisableAccountRequestService } from 'app/entities/disable-account-request/disable-account-request.service';
import { DisableAccountRequest } from 'app/shared/model/disable-account-request.model';

describe('Component Tests', () => {
  describe('DisableAccountRequest Management Update Component', () => {
    let comp: DisableAccountRequestUpdateComponent;
    let fixture: ComponentFixture<DisableAccountRequestUpdateComponent>;
    let service: DisableAccountRequestService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [UserManagementFeTestModule],
        declarations: [DisableAccountRequestUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(DisableAccountRequestUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(DisableAccountRequestUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(DisableAccountRequestService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new DisableAccountRequest('123');
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
        const entity = new DisableAccountRequest();
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
