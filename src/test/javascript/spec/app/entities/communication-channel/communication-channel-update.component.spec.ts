import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { UserManagementFeTestModule } from '../../../test.module';
import { CommunicationChannelUpdateComponent } from 'app/entities/communication-channel/communication-channel-update.component';
import { CommunicationChannelService } from 'app/entities/communication-channel/communication-channel.service';
import { CommunicationChannel } from 'app/shared/model/communication-channel.model';

describe('Component Tests', () => {
  describe('CommunicationChannel Management Update Component', () => {
    let comp: CommunicationChannelUpdateComponent;
    let fixture: ComponentFixture<CommunicationChannelUpdateComponent>;
    let service: CommunicationChannelService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [UserManagementFeTestModule],
        declarations: [CommunicationChannelUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(CommunicationChannelUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CommunicationChannelUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CommunicationChannelService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new CommunicationChannel('123');
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
        const entity = new CommunicationChannel();
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
