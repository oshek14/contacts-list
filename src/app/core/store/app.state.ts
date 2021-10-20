import {
  IContactsState,
  initialContactsState,
} from './contacts/contacts.state';
import { IGroupsState, initialGroupsState } from './groups/groups.state';

export interface IAppState {
  contacts: IContactsState;
  groups: IGroupsState;
}
export const initialAppState = {
  contacts: initialContactsState,
  groups: initialGroupsState,
};

export function getInitialState(): IAppState {
  return initialAppState;
}
