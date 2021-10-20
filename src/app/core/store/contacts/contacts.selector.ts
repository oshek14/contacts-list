import { createSelector } from '@ngrx/store';
import { IContactsState } from './contacts.state';

const selectContacts = (state: any) => state.contacts;

export const allContacts = createSelector(
  selectContacts,
  (state: IContactsState) => state.contacts
);

export const activeContact = createSelector(
  selectContacts,
  (state: IContactsState) => state.activeContact
);
