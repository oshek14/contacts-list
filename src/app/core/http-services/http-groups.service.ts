import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class HttpGroupsService {

  constructor(private http: HttpClient) { }

  getGroups(): Observable<any> {
    return this.http.get<any>(`${environment.apiBaseUrl}/groups`);
  }
}
