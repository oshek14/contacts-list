import { Injectable } from '@angular/core';
import { Effect, ofType, Actions } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, map, catchError, concatMap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import {
  GroupsFailed,
  GroupsSuccess,
  EGroupsActions,
  RequestGroups,
} from './groups.action';
import { HttpGroupsService } from '../../http-services/http-groups.service';

@Injectable()
export class GroupsEffect {
  @Effect()
  getGroups$ = this.actions.pipe(
    ofType<RequestGroups>(EGroupsActions.RequestGroups),
    switchMap(() => {
      return this.httpGroupsService.getGroups().pipe(
        map((Groups) => new GroupsSuccess(Groups)),
        catchError((error) => of(new GroupsFailed()))
      );
    })
  );

  constructor(
    private actions: Actions,
    private httpGroupsService: HttpGroupsService
  ) {}
}
