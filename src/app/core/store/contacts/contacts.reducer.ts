import { act } from '@ngrx/effects';
import { ContactsActions, EContactsActions } from './contacts.action';
import { IContactsState, initialContactsState } from './contacts.state';

export function contactsReducer(
    state = initialContactsState,
    action: ContactsActions
): IContactsState {
    switch (action.type) {
        case EContactsActions.ContactsSuccess: {
            return {
                ...state,
                isFetching: false,
                failed: false,
                contacts: action.payload,
            };
        }
        case EContactsActions.ContactsFailed: {
            return {
                ...state,
                isFetching: false,
                failed: true,
                contacts: null,
            };
        }
        case EContactsActions.ActiveContactSuccess: {
            return {
                ...state,
                activeContact: action.payload,
            };
        }
        case EContactsActions.ActiveContactFailed:
        case EContactsActions.ResetActiveContact: {
            return {
                ...state,
                activeContact: null,
            };
        }
        case EContactsActions.ContactSetSuccess: {
            let newContacts = [...state.contacts, action.payload];
            return {
                ...state,
                contacts: newContacts,
            };
        }
        case EContactsActions.ContactSetFailed: {
            return {
                ...state,
            };
        }
        case EContactsActions.EditContactSuccess: {
            let activeContact = state.activeContact;
            let contacts = state.contacts.map((contact) => {
                if(contact.id == action.payload.id) {
                    activeContact = action.payload;
                    return action.payload;
                }
                return contact;
            })
            return {
                ...state,
                contacts: contacts,
                activeContact: activeContact
            };
        }
        case EContactsActions.EditContactFailed: {
            return {
                ...state,
            };
        }
        case EContactsActions.DeleteContactSuccess: {
            let newContacts = state.contacts.filter((contact) => {
                return contact.id != action.payload
            })
            return {
                ...state,
                contacts: newContacts,
            };
        }
        case EContactsActions.DeleteContactFailed: {
            return {
                ...state,
            };
        }
        default:
            return state;
    }
}
