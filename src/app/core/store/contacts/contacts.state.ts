import { IHttpContact } from '../../models/http-contacts.model';

export interface IContactsState {
  isFetching: boolean;
  contacts: Array<IHttpContact>;
  failed: boolean;
  activeContact: IHttpContact;
}
export const initialContactsState: IContactsState = {
  isFetching: true,
  contacts: null,
  failed: false,
  activeContact: null,
};
