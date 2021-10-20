import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpContactsService } from '../http-services/http-contacts.service';

@Injectable()
export class ContactsService {
    constructor(private httpContactsService: HttpContactsService) {}

    getContacts(): Observable<any> {
        return this.httpContactsService.getContacts().pipe(
            map((res) => {
                return res;
            }),
            catchError((err) => {
                return throwError(err);
            })
        );
    }

    getContact(id): Observable<any> {
        return this.httpContactsService.getContact(id).pipe(
            map((res) => {
                return res;
            }),
            catchError((err) => {
                return throwError(err);
            })
        );
    }

    setContact(params): Observable<any> {
        return this.httpContactsService.setContact(params).pipe(
            map((res) => {
                return res;
            }),
            catchError((err) => {
                return throwError(err);
            })
        );
    }

    deleteContact(id): Observable<any> {
        return this.httpContactsService.deleteContact(id).pipe(
            map((res) => {
                return res;
            }),
            catchError((err) => {
                return throwError(err);
            })
        );
    }

    editContact(params): Observable<any> {
        return this.httpContactsService.editContact(params).pipe(
            map((res) => {
                return res;
            }),
            catchError((err) => {
                return throwError(err);
            })
        );
    }
}
