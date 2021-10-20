import { GroupsActions, EGroupsActions } from './groups.action';
import { IGroupsState, initialGroupsState } from './groups.state';

export function groupsReducer(
  state = initialGroupsState,
  action: GroupsActions
): IGroupsState {
  switch (action.type) {
    case EGroupsActions.GroupsSuccess: {
      return {
        ...state,
        isFetching: false,
        failed: false,
        groups: action.payload,
      };
    }
    case EGroupsActions.GroupsFailed: {
      return {
        ...state,
        isFetching: false,
        failed: true,
        groups: null,
      };
    }
    default:
      return state;
  }
}
