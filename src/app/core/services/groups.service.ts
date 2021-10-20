import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpGroupsService } from '../http-services/http-groups.service';

@Injectable()
export class GroupsService {

  constructor(private httpGroupsService: HttpGroupsService) { }

  getGroups(): Observable<any> {
    return this.httpGroupsService.getGroups().pipe(
      map((res) => {
        return res;
      }),
      catchError((err) => {
        return throwError(err);
      })
    );
  }
}
