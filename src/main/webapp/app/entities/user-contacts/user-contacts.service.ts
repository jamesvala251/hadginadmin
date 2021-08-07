import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IUserContacts } from 'app/shared/model/user-contacts.model';

type EntityResponseType = HttpResponse<IUserContacts>;
type EntityArrayResponseType = HttpResponse<IUserContacts[]>;

@Injectable({ providedIn: 'root' })
export class UserContactsService {
  public resourceUrl = SERVER_API_URL + 'services/userdetailsservice/api/user-contacts';

  constructor(protected http: HttpClient) {}

  create(userContacts: IUserContacts): Observable<EntityResponseType> {
    return this.http.post<IUserContacts>(this.resourceUrl, userContacts, { observe: 'response' });
  }

  update(userContacts: IUserContacts): Observable<EntityResponseType> {
    return this.http.put<IUserContacts>(this.resourceUrl, userContacts, { observe: 'response' });
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http.get<IUserContacts>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  findContactsByUserId(userId: string): Observable<EntityArrayResponseType> {
    return this.http.get<IUserContacts[]>(`${this.resourceUrl}-userid/${userId}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IUserContacts[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
