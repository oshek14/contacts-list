import { Action } from '@ngrx/store';
import { IHttpContact } from '../../models/http-contacts.model';

export enum EContactsActions {
    RequestContacts = '[Core module, Contacts] Request Contacts',
    ContactsSuccess = '[Core module, Contacts] Contacts Success',
    ContactsFailed = '[Core module, Contacts] Contacts Failed',
    RequestActiveContact = '[Core module, Contacts] Request Active Contact',
    ResetActiveContact = '[Core module, Contacts] Reset Active Contact',
    ActiveContactSuccess = '[Core module, Contacts] Active Contact Success',
    ActiveContactFailed = '[Core module, Contacts] Active Contact Failed',
    SetContact = '[Core module, Contacts] Set Contact',
    ContactSetSuccess = '[Core module, Contacts] Set Contact Success',
    ContactSetFailed = '[Core module, Contacts] Set Contact Failed',
    DeleteContact = '[Core module, Contacts] Delete Contact',
    DeleteContactSuccess = '[Core module, Contacts] Delete Contact Success',
    DeleteContactFailed = '[Core module, Contacts] Delete Contact Failed',
    EditContact = '[Core module, Contacts] Edit Contact',
    EditContactSuccess = '[Core module, Contacts] Edit Contact Success',
    EditContactFailed = '[Core module, Contacts] Edit Contact Failed',
}
export class RequestContacts implements Action {
    public readonly type = EContactsActions.RequestContacts;
}

export class ContactsSuccess implements Action {
    public readonly type = EContactsActions.ContactsSuccess;
    constructor(public payload: Array<IHttpContact>) {}
}

export class ContactsFailed implements Action {
    public readonly type = EContactsActions.ContactsFailed;
}

export class RequestActiveContact implements Action {
    public readonly type = EContactsActions.RequestActiveContact;
    constructor(public payload: number) {}
}

export class ResetActiveContact implements Action {
    public readonly type = EContactsActions.ResetActiveContact;
}

export class ActiveContactSuccess implements Action {
    public readonly type = EContactsActions.ActiveContactSuccess;
    constructor(public payload: IHttpContact) {}
}

export class ActiveContactFailed implements Action {
    public readonly type = EContactsActions.ActiveContactFailed;
}

export class SetContact implements Action {
    public readonly type = EContactsActions.SetContact;
    constructor(public payload: IHttpContact) {}
}

export class ContactSetSuccess implements Action {
    public readonly type = EContactsActions.ContactSetSuccess;
    constructor(public payload: IHttpContact) {}
}

export class ContactSetFailed implements Action {
    public readonly type = EContactsActions.ContactSetFailed;
}

export class DeleteContact implements Action {
    public readonly type = EContactsActions.DeleteContact;
    constructor(public payload: number) {}
}

export class DeleteContactSuccess implements Action {
    public readonly type = EContactsActions.DeleteContactSuccess;
    constructor(public payload: number) {}
}

export class DeleteContactFailed implements Action {
    public readonly type = EContactsActions.DeleteContactFailed;
}

export class EditContact implements Action {
    public readonly type = EContactsActions.EditContact;
    constructor(public payload: IHttpContact) {}
}

export class EditContactSuccess implements Action {
    public readonly type = EContactsActions.EditContactSuccess;
    constructor(public payload: IHttpContact) {}
}

export class EditContactFailed implements Action {
    public readonly type = EContactsActions.EditContactFailed;
}

export type ContactsActions =
    | RequestContacts
    | ContactsSuccess
    | ContactsFailed
    | RequestActiveContact
    | ResetActiveContact
    | ActiveContactSuccess
    | ActiveContactFailed
    | SetContact
    | ContactSetSuccess
    | ContactSetFailed
    | DeleteContact
    | DeleteContactSuccess
    | DeleteContactFailed
    | EditContact
    | EditContactSuccess
    | EditContactFailed;
