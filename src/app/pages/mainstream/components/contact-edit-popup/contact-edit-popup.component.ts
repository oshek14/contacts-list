import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FadeAnimation } from 'src/app/animations/fade.animation';
import { IHttpContact } from 'src/app/core/models/http-contacts.model';
import { IHttpGroup } from 'src/app/core/models/http-groups.model';
import { ContactsService } from 'src/app/core/services/contacts.service';
import { PopupsNotifierService } from 'src/app/shared/services/popups-notifier.service';
import {
    MarkFormGroupTouched,
    MarkFormGroupUntouched,
} from 'src/app/utils/form.utils';

@Component({
    selector: 'contact-edit-popup',
    templateUrl: './contact-edit-popup.component.html',
    styleUrls: ['./contact-edit-popup.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [FadeAnimation],
})
export class ContactEditPopupComponent implements OnInit {
    @Input() allGroups: Array<IHttpGroup> = [];

    @Output() close = new EventEmitter();
    @Output() submitted = new EventEmitter();

    form: FormGroup;
    currentId: number = null;
    show: boolean = false;
    popupName: string = 'EDIT_CONTACT_POPUP';
    contactToEdit: IHttpContact;

    constructor(
        private popupsNotifierService: PopupsNotifierService,
        private ref: ChangeDetectorRef,
        private formBuilder: FormBuilder
    ) {}

    ngOnInit(): void {
        this.form = this.formBuilder.group({
            firstName: [null, [Validators.required]],
            middleName: [null, [Validators.required]],
            lastName: [null, [Validators.required]],
            email: [null, [Validators.required]],
            groupId: [null, [Validators.required]],
            notificationsStatus: [false],
        });
        this.popupsNotifierService
            .getPopupStatus(this.popupName)
            .subscribe((res) => {
                this.show = res?.show;
                if (!this.show) {
                    this.resetForm();
                } else if (res?.data) {
                    this.setForm(res.data);
                }
                this.ref.markForCheck();
            });
    }

    closePopup() {
        this.close.emit();
    }

    submit() {
        if (this.form.invalid) {
            MarkFormGroupTouched(this.form.controls);
        } else {
        this.currentId = null;
            this.submitted.emit({ ...this.form.value, id: this.contactToEdit.id });
            this.closePopup();
        }
    }

    resetForm() {
        this.contactToEdit = null;
        this.form.get('firstName').setValue(null);
        this.form.get('middleName').setValue(null);
        this.form.get('lastName').setValue(null);
        this.form.get('email').setValue(null);
        this.form.get('groupId').setValue(null);
        this.form.get('notificationsStatus').setValue(false);
        MarkFormGroupUntouched(this.form.controls);
    }

    setForm(data) {
        this.contactToEdit = data;
        this.form.get('firstName').setValue(data.firstName);
        this.form.get('middleName').setValue(data.middleName);
        this.form.get('lastName').setValue(data.lastName);
        this.form.get('email').setValue(data.email);
        this.form.get('groupId').setValue(data.groupId);
        this.form.get('notificationsStatus').setValue(data.notificationsStatus);
    }

    get firstName() {
        return this.form.get('firstName');
    }
    get middleName() {
        return this.form.get('middleName');
    }
    get lastName() {
        return this.form.get('lastName');
    }
    get email() {
        return this.form.get('email');
    }
    get groupId() {
        return this.form.get('groupId');
    }

    get initials() {
        return (
            this.contactToEdit?.firstName[0].toUpperCase() +
            this.contactToEdit?.lastName[0].toUpperCase()
        );
    }

}
