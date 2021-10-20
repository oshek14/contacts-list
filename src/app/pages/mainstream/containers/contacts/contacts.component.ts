import {
    ChangeDetectionStrategy,
    Component,
    OnDestroy,
    OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { IHttpContact } from 'src/app/core/models/http-contacts.model';
import {
    RequestContacts,
    RequestActiveContact,
    SetContact,
    DeleteContact,
    ResetActiveContact,
    EditContact,
} from 'src/app/core/store/contacts/contacts.action';
import {
    activeContact,
    allContacts,
} from 'src/app/core/store/contacts/contacts.selector';
import { RequestGroups } from 'src/app/core/store/groups/groups.action';
import { allGroups } from 'src/app/core/store/groups/groups.selector';
import { PopupsNotifierService } from 'src/app/shared/services/popups-notifier.service';

@Component({
    selector: 'contacts',
    templateUrl: './contacts.component.html',
    styleUrls: ['./contacts.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactsComponent implements OnInit, OnDestroy {
    allContacts$ = this.store.select(allContacts);
    activeContact$ = this.store.select(activeContact);
    allGroups$ = this.store.select(allGroups);

    routeParamsSubscription: Subscription;

    constructor(
        private store: Store,
        private route: ActivatedRoute,
        private popupsNotifierService: PopupsNotifierService
    ) {}

    ngOnInit(): void {
        this.store.dispatch(new RequestContacts());
        this.store.dispatch(new RequestGroups());
        this.routeParamsSubscription = this.route.queryParams.subscribe(
            (params) => {
                if (params?.id) {
                    this.store.dispatch(new RequestActiveContact(params.id));
                }
            }
        );
    }

    ngOnDestroy() {
        this.routeParamsSubscription.unsubscribe();
    }

    add() {
        this.popupsNotifierService.openPopup('ADD_CONTACT_POPUP');
    }

    edit(activeContact) {
        this.popupsNotifierService.openPopup(
            'EDIT_CONTACT_POPUP',
            activeContact
        );
    }

    addSubmitted(event: IHttpContact) {
        this.store.dispatch(new SetContact(event));
    }

    editSubmitted(event: IHttpContact) {
        this.store.dispatch(new EditContact(event));
    }

    deleteById(id) {
        this.store.dispatch(new DeleteContact(id));
        this.store.dispatch(new ResetActiveContact());
    }

    closeAddPopup() {
        this.popupsNotifierService.closePopup('ADD_CONTACT_POPUP');
    }

    closeEditPopup() {
        this.popupsNotifierService.closePopup('EDIT_CONTACT_POPUP');
    }
}
