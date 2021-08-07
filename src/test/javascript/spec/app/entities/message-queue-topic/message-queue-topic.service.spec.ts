import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { MessageQueueTopicService } from 'app/entities/message-queue-topic/message-queue-topic.service';
import { IMessageQueueTopic, MessageQueueTopic } from 'app/shared/model/message-queue-topic.model';
import { Status } from 'app/shared/model/enumerations/status.model';

describe('Service Tests', () => {
  describe('MessageQueueTopic Service', () => {
    let injector: TestBed;
    let service: MessageQueueTopicService;
    let httpMock: HttpTestingController;
    let elemDefault: IMessageQueueTopic;
    let expectedResult: IMessageQueueTopic | IMessageQueueTopic[] | boolean | null;
    let currentDate: moment.Moment;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(MessageQueueTopicService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new MessageQueueTopic('ID', 'AAAAAAA', 'AAAAAAA', Status.ACTIVE, currentDate, 'AAAAAAA');
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            modifiedOn: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        service.find('123').subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a MessageQueueTopic', () => {
        const returnedFromService = Object.assign(
          {
            id: 'ID',
            modifiedOn: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            modifiedOn: currentDate,
          },
          returnedFromService
        );

        service.create(new MessageQueueTopic()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a MessageQueueTopic', () => {
        const returnedFromService = Object.assign(
          {
            topicName: 'BBBBBB',
            description: 'BBBBBB',
            status: 'BBBBBB',
            modifiedOn: currentDate.format(DATE_TIME_FORMAT),
            modifiedBy: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            modifiedOn: currentDate,
          },
          returnedFromService
        );

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of MessageQueueTopic', () => {
        const returnedFromService = Object.assign(
          {
            topicName: 'BBBBBB',
            description: 'BBBBBB',
            status: 'BBBBBB',
            modifiedOn: currentDate.format(DATE_TIME_FORMAT),
            modifiedBy: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            modifiedOn: currentDate,
          },
          returnedFromService
        );

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a MessageQueueTopic', () => {
        service.delete('123').subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
