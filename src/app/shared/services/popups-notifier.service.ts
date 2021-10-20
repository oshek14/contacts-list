import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class PopupsNotifierService {
    activeModal: string = null;

    private addContactPopupSubject$ = new BehaviorSubject<any>(null);
    private editContactPopupSubject$ = new BehaviorSubject<any>(null);

    popups = {
        ADD_CONTACT_POPUP: this.addContactPopupSubject$,
        EDIT_CONTACT_POPUP: this.editContactPopupSubject$,
    };

    constructor() {}

    getPopupStatus(popup): Observable<any> {
        return this.popups[popup].asObservable();
    }

    openPopup(popup, data = null) {
        if (this.activeModal != popup) {
            this.popups[this.activeModal]?.next({ show: false });
            this.activeModal = popup;
            if (data) {
                this.popups[this.activeModal].next({ show: true, data });
            } else {
                this.popups[this.activeModal].next({ show: true });
            }
        }
    }

    closePopup(popup) {
        if (this.activeModal == popup) {
            this.popups[this.activeModal].next(false);
            this.activeModal = null;
        }
    }
}
