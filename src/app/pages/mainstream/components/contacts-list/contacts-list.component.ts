import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    Input,
    OnDestroy,
    OnInit,
    Output,
    ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { fromEvent, Subscription } from 'rxjs';
import {
    debounceTime,
    distinctUntilChanged,
    filter,
    tap,
} from 'rxjs/operators';
import { IHttpContact } from 'src/app/core/models/http-contacts.model';

@Component({
    selector: 'contacts-list',
    templateUrl: './contacts-list.component.html',
    styleUrls: ['./contacts-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactsListComponent implements OnInit, AfterViewInit, OnDestroy {
    @Input() activeContact: IHttpContact;
    @Input()
    set contacts(value: Array<IHttpContact>) {
        this._contacts = value;
        this.setGroupedContacts();
    }
    get contacts(): Array<IHttpContact> {
        return this._contacts;
    }

    @Output() addClick = new EventEmitter();

    @ViewChild('searchInputElem', { read: ElementRef })
    searchInputElem: ElementRef;

    groupedContacts: { [key: string]: Array<IHttpContact> } = {};
    searchDebounceSubscription: Subscription;
    searchInput: string;

    private _contacts;

    constructor(private ref: ChangeDetectorRef, private router: Router) {}

    ngOnInit(): void {}

    ngAfterViewInit() {
        this.searchDebounceSubscription = fromEvent(
            this.searchInputElem.nativeElement,
            'input'
        )
            .pipe(
                filter(Boolean),
                debounceTime(200),
                distinctUntilChanged(),
                tap(() => {
                    this.setGroupedContacts();
                })
            )
            .subscribe();
    }

    ngOnDestroy() {
        this.searchDebounceSubscription.unsubscribe();
    }

    setGroupedContacts() {
        this.groupedContacts = {};
        if (this.contacts?.length) {
            this.contacts.forEach((contact) => {
                let char = contact.firstName[0].toLowerCase();
                if (this.searchInput) {
                    let fullName = `${contact.firstName} ${contact.middleName} ${contact.lastName}`;
                    let includes = fullName
                        .toLowerCase()
                        .includes(this.searchInput.toLowerCase());
                    if (!includes) {
                        return;
                    }
                }
                if (!this.groupedContacts[char]) {
                    this.groupedContacts[char] = [];
                }
                this.groupedContacts[char].push(contact);
            });
        }
        this.ref.markForCheck();
    }

    activateContact(id) {
        this.router.navigate(['contacts'], { queryParams: { id } });
    }

    addClicked() {
        this.addClick.emit();
    }
}
