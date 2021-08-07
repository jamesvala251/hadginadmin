import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IProfilePicture } from 'app/shared/model/profile-picture.model';

type EntityResponseType = HttpResponse<IProfilePicture>;
type EntityArrayResponseType = HttpResponse<IProfilePicture[]>;

@Injectable({ providedIn: 'root' })
export class ProfilePictureService {
  public resourceUrl = SERVER_API_URL + 'services/userdetailsservice/api/profile-pictures';
  private profilePicture = new BehaviorSubject<IProfilePicture | null>(null);

  constructor(protected http: HttpClient) {}

  create(profilePicture: IProfilePicture): Observable<EntityResponseType> {
    return this.http.post<IProfilePicture>(this.resourceUrl, profilePicture, { observe: 'response' });
  }

  update(profilePicture: IProfilePicture): Observable<EntityResponseType> {
    return this.http.put<IProfilePicture>(this.resourceUrl, profilePicture, { observe: 'response' });
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http.get<IProfilePicture>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  findByUserId(userid: string): Observable<EntityResponseType> {
    return this.http.get<IProfilePicture>(`${this.resourceUrl}/userid/${userid}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IProfilePicture[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  subscribeForNewProfilePictureChange(): Observable<IProfilePicture | null> {
    return this.profilePicture.asObservable();
  }

  setNewProfilePicture(profilePictureData: IProfilePicture | null): void {
    this.profilePicture.next(profilePictureData);
  }
}
