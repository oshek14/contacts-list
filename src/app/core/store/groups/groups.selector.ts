import { createSelector } from '@ngrx/store';
import { IGroupsState } from './groups.state';

const selectGroups = (state: any) => state.groups;

export const allGroups = createSelector(
  selectGroups,
  (state: IGroupsState) => state.groups
);
