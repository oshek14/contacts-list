import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IHttpContact } from '../models/http-contacts.model';

@Injectable()
export class HttpContactsService {
    constructor(private http: HttpClient) {}

    getContacts(): Observable<any> {
        return this.http.get<any>(`${environment.apiBaseUrl}/contacts`);
    }

    getContact(id: number): Observable<any> {
        return this.http.get<any>(`${environment.apiBaseUrl}/contacts/${id}`);
    }

    setContact(params: IHttpContact): Observable<any> {
        return this.http.post<any>(
            `${environment.apiBaseUrl}/contacts`,
            params
        );
    }

    deleteContact(id: number): Observable<any> {
        const options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            }),
            body: { id },
        };
        return this.http.delete<any>(
            `${environment.apiBaseUrl}/contacts`,
            options
        );
    }

    editContact(params): Observable<any> {
        return this.http.patch<any>(
            `${environment.apiBaseUrl}/contacts`,
            params
        );
    }
}
