import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { UserManagementFeTestModule } from '../../../test.module';
import { MessageQueueTopicDetailComponent } from 'app/entities/message-queue-topic/message-queue-topic-detail.component';
import { MessageQueueTopic } from 'app/shared/model/message-queue-topic.model';

describe('Component Tests', () => {
  describe('MessageQueueTopic Management Detail Component', () => {
    let comp: MessageQueueTopicDetailComponent;
    let fixture: ComponentFixture<MessageQueueTopicDetailComponent>;
    const route = ({ data: of({ messageQueueTopic: new MessageQueueTopic('123') }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [UserManagementFeTestModule],
        declarations: [MessageQueueTopicDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(MessageQueueTopicDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(MessageQueueTopicDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load messageQueueTopic on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.messageQueueTopic).toEqual(jasmine.objectContaining({ id: '123' }));
      });
    });
  });
});
