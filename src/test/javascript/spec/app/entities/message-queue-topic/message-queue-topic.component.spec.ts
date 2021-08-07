import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { UserManagementFeTestModule } from '../../../test.module';
import { MessageQueueTopicComponent } from 'app/entities/message-queue-topic/message-queue-topic.component';
import { MessageQueueTopicService } from 'app/entities/message-queue-topic/message-queue-topic.service';
import { MessageQueueTopic } from 'app/shared/model/message-queue-topic.model';

describe('Component Tests', () => {
  describe('MessageQueueTopic Management Component', () => {
    let comp: MessageQueueTopicComponent;
    let fixture: ComponentFixture<MessageQueueTopicComponent>;
    let service: MessageQueueTopicService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [UserManagementFeTestModule],
        declarations: [MessageQueueTopicComponent],
      })
        .overrideTemplate(MessageQueueTopicComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(MessageQueueTopicComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(MessageQueueTopicService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new MessageQueueTopic('123')],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.messageQueueTopics && comp.messageQueueTopics[0]).toEqual(jasmine.objectContaining({ id: '123' }));
    });
  });
});
