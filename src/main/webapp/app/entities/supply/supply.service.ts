import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ISupply } from 'app/shared/model/supply.model';

type EntityResponseType = HttpResponse<ISupply>;
type EntityArrayResponseType = HttpResponse<ISupply[]>;

@Injectable({ providedIn: 'root' })
export class SupplyService {
  public resourceUrl = SERVER_API_URL + 'api/supplies';

  constructor(protected http: HttpClient) {}

  create(supply: ISupply): Observable<EntityResponseType> {
    return this.http.post<ISupply>(this.resourceUrl, supply, { observe: 'response' });
  }

  update(supply: ISupply): Observable<EntityResponseType> {
    return this.http.put<ISupply>(this.resourceUrl, supply, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ISupply>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ISupply[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
