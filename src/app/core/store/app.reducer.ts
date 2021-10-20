import { Action, ActionReducerMap } from '@ngrx/store';
import { IAppState } from './app.state';
import { contactsReducer } from './contacts/contacts.reducer';
import { groupsReducer } from './groups/groups.reducer';

export const appReducers: ActionReducerMap<IAppState, Action> = {
    contacts: contactsReducer,
    groups: groupsReducer
};
