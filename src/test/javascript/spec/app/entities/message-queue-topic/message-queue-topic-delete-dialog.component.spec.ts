import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { UserManagementFeTestModule } from '../../../test.module';
import { MockEventManager } from '../../../helpers/mock-event-manager.service';
import { MockActiveModal } from '../../../helpers/mock-active-modal.service';
import { MessageQueueTopicDeleteDialogComponent } from 'app/entities/message-queue-topic/message-queue-topic-delete-dialog.component';
import { MessageQueueTopicService } from 'app/entities/message-queue-topic/message-queue-topic.service';

describe('Component Tests', () => {
  describe('MessageQueueTopic Management Delete Component', () => {
    let comp: MessageQueueTopicDeleteDialogComponent;
    let fixture: ComponentFixture<MessageQueueTopicDeleteDialogComponent>;
    let service: MessageQueueTopicService;
    let mockEventManager: MockEventManager;
    let mockActiveModal: MockActiveModal;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [UserManagementFeTestModule],
        declarations: [MessageQueueTopicDeleteDialogComponent],
      })
        .overrideTemplate(MessageQueueTopicDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(MessageQueueTopicDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(MessageQueueTopicService);
      mockEventManager = TestBed.get(JhiEventManager);
      mockActiveModal = TestBed.get(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete('123');
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith('123');
          expect(mockActiveModal.closeSpy).toHaveBeenCalled();
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));

      it('Should not call delete service on clear', () => {
        // GIVEN
        spyOn(service, 'delete');

        // WHEN
        comp.cancel();

        // THEN
        expect(service.delete).not.toHaveBeenCalled();
        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
      });
    });
  });
});
