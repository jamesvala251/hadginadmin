import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IDisableAccountRequest } from 'app/shared/model/disable-account-request.model';

type EntityResponseType = HttpResponse<IDisableAccountRequest>;
type EntityArrayResponseType = HttpResponse<IDisableAccountRequest[]>;

@Injectable({ providedIn: 'root' })
export class DisableAccountRequestService {
  public resourceUrl = SERVER_API_URL + 'services/userdetailsservice/api/disable-account-requests';

  constructor(protected http: HttpClient) {}

  create(disableAccountRequest: IDisableAccountRequest): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(disableAccountRequest);
    return this.http
      .post<IDisableAccountRequest>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(disableAccountRequest: IDisableAccountRequest): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(disableAccountRequest);
    return this.http
      .put<IDisableAccountRequest>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http
      .get<IDisableAccountRequest>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  findByUserId(userId: string): Observable<EntityArrayResponseType> {
    return this.http.get<IDisableAccountRequest[]>(`${this.resourceUrl}/userid/${userId}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IDisableAccountRequest[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(disableAccountRequest: IDisableAccountRequest): IDisableAccountRequest {
    const copy: IDisableAccountRequest = Object.assign({}, disableAccountRequest, {
      createdDate:
        disableAccountRequest.createdDate && disableAccountRequest.createdDate.isValid()
          ? disableAccountRequest.createdDate.toJSON()
          : undefined,
      updatedDate:
        disableAccountRequest.updatedDate && disableAccountRequest.updatedDate.isValid()
          ? disableAccountRequest.updatedDate.toJSON()
          : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.createdDate = res.body.createdDate ? moment(res.body.createdDate) : undefined;
      res.body.updatedDate = res.body.updatedDate ? moment(res.body.updatedDate) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((disableAccountRequest: IDisableAccountRequest) => {
        disableAccountRequest.createdDate = disableAccountRequest.createdDate ? moment(disableAccountRequest.createdDate) : undefined;
        disableAccountRequest.updatedDate = disableAccountRequest.updatedDate ? moment(disableAccountRequest.updatedDate) : undefined;
      });
    }
    return res;
  }
}
