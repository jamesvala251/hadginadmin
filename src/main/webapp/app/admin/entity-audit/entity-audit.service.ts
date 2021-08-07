import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { EntityAuditEvent } from './entity-audit-event.model';
import { SERVER_API_URL } from 'app/app.constants';

@Injectable({ providedIn: 'root' })
export class EntityAuditService {
  public resourceUrl = SERVER_API_URL;
  constructor(private http: HttpClient) {}

  getAllAudited(): Observable<string[]> {
    return this.http.get<string[]>(this.resourceUrl + 'services/userdetailsservice/api/audits/entity/all');
  }

  findByEntity(entity: string, limit: number): Observable<HttpResponse<EntityAuditEvent[]>> {
    const params: HttpParams = new HttpParams().append('entityType', entity).append('limit', limit.toString());
    let serviceName = 'userdetailsservice';
    if (entity === 'Notification') {
      serviceName = 'notificationservice';
    }
    const serviceUrl = this.resourceUrl + 'services/' + serviceName + '/api/audits/entity/changes';
    return this.http.get<EntityAuditEvent[]>(serviceUrl, {
      params,
      observe: 'response',
    });
  }

  getPrevVersion(qualifiedName: string, entityId: string, commitVersion: number): Observable<HttpResponse<EntityAuditEvent>> {
    const params: HttpParams = new HttpParams()
      .append('qualifiedName', qualifiedName)
      .append('entityId', entityId)
      .append('commitVersion', commitVersion.toString());
    let serviceName = 'userdetailsservice';
    if (qualifiedName === 'Notification') {
      serviceName = 'notificationservice';
    }
    const serviceUrl = this.resourceUrl + 'services/' + serviceName + '/api/audits/entity/changes/version/previous';
    return this.http.get<EntityAuditEvent>(serviceUrl, {
      params,
      observe: 'response',
    });
  }
}
