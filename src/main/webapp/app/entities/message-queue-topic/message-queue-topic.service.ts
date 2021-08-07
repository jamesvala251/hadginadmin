import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IMessageQueueTopic } from 'app/shared/model/message-queue-topic.model';

type EntityResponseType = HttpResponse<IMessageQueueTopic>;
type EntityArrayResponseType = HttpResponse<IMessageQueueTopic[]>;

@Injectable({ providedIn: 'root' })
export class MessageQueueTopicService {
  public resourceUrl = SERVER_API_URL + 'services/notificationservice/api/message-queue-topics';

  constructor(protected http: HttpClient) {}

  create(messageQueueTopic: IMessageQueueTopic): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(messageQueueTopic);
    return this.http
      .post<IMessageQueueTopic>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(messageQueueTopic: IMessageQueueTopic): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(messageQueueTopic);
    return this.http
      .put<IMessageQueueTopic>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http
      .get<IMessageQueueTopic>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IMessageQueueTopic[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(messageQueueTopic: IMessageQueueTopic): IMessageQueueTopic {
    const copy: IMessageQueueTopic = Object.assign({}, messageQueueTopic, {
      modifiedOn:
        messageQueueTopic.modifiedOn && messageQueueTopic.modifiedOn.isValid() ? messageQueueTopic.modifiedOn.toJSON() : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.modifiedOn = res.body.modifiedOn ? moment(res.body.modifiedOn) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((messageQueueTopic: IMessageQueueTopic) => {
        messageQueueTopic.modifiedOn = messageQueueTopic.modifiedOn ? moment(messageQueueTopic.modifiedOn) : undefined;
      });
    }
    return res;
  }
}
