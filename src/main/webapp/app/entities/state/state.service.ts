import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IState } from 'app/shared/model/state.model';

type EntityResponseType = HttpResponse<IState>;
type EntityArrayResponseType = HttpResponse<IState[]>;

@Injectable({ providedIn: 'root' })
export class StateService {
  public resourceUrl = SERVER_API_URL + 'services/userdetailsservice/api/states';

  constructor(protected http: HttpClient) {}

  create(state: IState): Observable<EntityResponseType> {
    return this.http.post<IState>(this.resourceUrl, state, { observe: 'response' });
  }

  update(state: IState): Observable<EntityResponseType> {
    return this.http.put<IState>(this.resourceUrl, state, { observe: 'response' });
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http.get<IState>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  findByCountry(countryId: string): Observable<EntityArrayResponseType> {
    return this.http.get<IState[]>(`${this.resourceUrl}/bycountry/${countryId}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IState[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
