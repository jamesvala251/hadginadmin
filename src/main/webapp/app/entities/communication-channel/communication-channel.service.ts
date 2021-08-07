import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ICommunicationChannel } from 'app/shared/model/communication-channel.model';

type EntityResponseType = HttpResponse<ICommunicationChannel>;
type EntityArrayResponseType = HttpResponse<ICommunicationChannel[]>;

@Injectable({ providedIn: 'root' })
export class CommunicationChannelService {
  public resourceUrl = SERVER_API_URL + 'services/notificationservice/api/communication-channels';

  constructor(protected http: HttpClient) {}

  create(communicationChannel: ICommunicationChannel): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(communicationChannel);
    return this.http
      .post<ICommunicationChannel>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(communicationChannel: ICommunicationChannel): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(communicationChannel);
    return this.http
      .put<ICommunicationChannel>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http
      .get<ICommunicationChannel>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ICommunicationChannel[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(communicationChannel: ICommunicationChannel): ICommunicationChannel {
    const copy: ICommunicationChannel = Object.assign({}, communicationChannel, {
      modifiedOn:
        communicationChannel.modifiedOn && communicationChannel.modifiedOn.isValid() ? communicationChannel.modifiedOn.toJSON() : undefined,
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
      res.body.forEach((communicationChannel: ICommunicationChannel) => {
        communicationChannel.modifiedOn = communicationChannel.modifiedOn ? moment(communicationChannel.modifiedOn) : undefined;
      });
    }
    return res;
  }
}
