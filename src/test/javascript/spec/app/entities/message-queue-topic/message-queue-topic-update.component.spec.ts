import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { UserManagementFeTestModule } from '../../../test.module';
import { MessageQueueTopicUpdateComponent } from 'app/entities/message-queue-topic/message-queue-topic-update.component';
import { MessageQueueTopicService } from 'app/entities/message-queue-topic/message-queue-topic.service';
import { MessageQueueTopic } from 'app/shared/model/message-queue-topic.model';

describe('Component Tests', () => {
  describe('MessageQueueTopic Management Update Component', () => {
    let comp: MessageQueueTopicUpdateComponent;
    let fixture: ComponentFixture<MessageQueueTopicUpdateComponent>;
    let service: MessageQueueTopicService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [UserManagementFeTestModule],
        declarations: [MessageQueueTopicUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(MessageQueueTopicUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(MessageQueueTopicUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(MessageQueueTopicService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new MessageQueueTopic('123');
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
        const entity = new MessageQueueTopic();
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
