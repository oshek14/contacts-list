import { Injectable } from '@angular/core';
import { Effect, ofType, Actions } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, map, catchError, concatMap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import {
  ActiveContactFailed,
  ActiveContactSuccess,
  ContactSetFailed,
  ContactSetSuccess,
  ContactsFailed,
  ContactsSuccess,
  DeleteContact,
  DeleteContactFailed,
  DeleteContactSuccess,
  EContactsActions,
  EditContact,
  EditContactFailed,
  EditContactSuccess,
  RequestActiveContact,
  RequestContacts,
  SetContact,
} from './contacts.action';
import { ContactsService } from '../../services/contacts.service';

@Injectable()
export class ContactsEffect {
  @Effect()
  getContacts$ = this.actions.pipe(
    ofType<RequestContacts>(EContactsActions.RequestContacts),
    switchMap(() => {
      return this.contactsService.getContacts().pipe(
        map((Contacts) => new ContactsSuccess(Contacts)),
        catchError((error) => of(new ContactsFailed()))
      );
    })
  );

  @Effect()
  getContact$ = this.actions.pipe(
    ofType<RequestActiveContact>(EContactsActions.RequestActiveContact),
    switchMap((data) => {
      return this.contactsService.getContact(data.payload).pipe(
        map((Contacts) => new ActiveContactSuccess(Contacts)),
        catchError((error) => of(new ActiveContactFailed()))
      );
    })
  );

  @Effect()
  SetContact$ = this.actions.pipe(
    ofType<SetContact>(EContactsActions.SetContact),
    switchMap((data) => {
      return this.contactsService.setContact(data.payload).pipe(
        map((newRecord) => new ContactSetSuccess(newRecord)),
        catchError((error) => {
          return of(new ContactSetFailed())
        })
      );
    })
  );
  
  @Effect()
  DeleteContact$ = this.actions.pipe(
    ofType<DeleteContact>(EContactsActions.DeleteContact),
    switchMap((data) => {
      return this.contactsService.deleteContact(data.payload).pipe(
        map(() => new DeleteContactSuccess(data.payload)),
        catchError((error) => {
          return of(new DeleteContactFailed())
        })
      );
    })
  );

  @Effect()
  EditContact$ = this.actions.pipe(
    ofType<EditContact>(EContactsActions.EditContact),
    switchMap((data) => {
      return this.contactsService.editContact(data.payload).pipe(
        map((newRecord) => new EditContactSuccess(newRecord)),
        catchError((error) => {
          return of(new EditContactFailed())
        })
      );
    })
  );


  constructor(
    private actions: Actions,
    private contactsService: ContactsService
  ) {}
}
