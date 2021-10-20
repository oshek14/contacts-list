import { Action } from '@ngrx/store';
import { IHttpGroup } from '../../models/http-groups.model';

export enum EGroupsActions {
  RequestGroups = '[Core module, Groups] Request Groups',
  GroupsSuccess = '[Core module, Groups] Groups Success',
  GroupsFailed = '[Core module, Groups] Groups Failed',
}
export class RequestGroups implements Action {
  public readonly type = EGroupsActions.RequestGroups;
}

export class GroupsSuccess implements Action {
  public readonly type = EGroupsActions.GroupsSuccess;
  constructor(public payload: Array<IHttpGroup>) {}
}

export class GroupsFailed implements Action {
  public readonly type = EGroupsActions.GroupsFailed;
}

export type GroupsActions =
  | RequestGroups
  | GroupsSuccess
  | GroupsFailed;
