import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IUserAddress } from 'app/shared/model/user-address.model';

type EntityResponseType = HttpResponse<IUserAddress>;
type EntityArrayResponseType = HttpResponse<IUserAddress[]>;

@Injectable({ providedIn: 'root' })
export class UserAddressService {
  public resourceUrl = SERVER_API_URL + 'services/userdetailsservice/api/user-addresses';

  constructor(protected http: HttpClient) {}

  create(userAddress: IUserAddress): Observable<EntityResponseType> {
    return this.http.post<IUserAddress>(this.resourceUrl, userAddress, { observe: 'response' });
  }

  update(userAddress: IUserAddress): Observable<EntityResponseType> {
    return this.http.put<IUserAddress>(this.resourceUrl, userAddress, { observe: 'response' });
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http.get<IUserAddress>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  findAddressesByUserId(userId: string): Observable<EntityArrayResponseType> {
    return this.http.get<IUserAddress[]>(`${this.resourceUrl}-userid/${userId}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IUserAddress[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
