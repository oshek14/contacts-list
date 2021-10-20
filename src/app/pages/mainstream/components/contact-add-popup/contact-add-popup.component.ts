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
import { IHttpGroup } from 'src/app/core/models/http-groups.model';
import { ContactsService } from 'src/app/core/services/contacts.service';
import { PopupsNotifierService } from 'src/app/shared/services/popups-notifier.service';
import {
    MarkFormGroupTouched,
    MarkFormGroupUntouched,
} from 'src/app/utils/form.utils';

@Component({
    selector: 'contact-add-popup',
    templateUrl: './contact-add-popup.component.html',
    styleUrls: ['./contact-add-popup.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [FadeAnimation],
})
export class ContactAddPopupComponent implements OnInit {
    @Input() allGroups: Array<IHttpGroup> = [];

    @Output() close = new EventEmitter();
    @Output() submitted = new EventEmitter();

    form: FormGroup;
    show: boolean = false;
    popupName: string = 'ADD_CONTACT_POPUP';

    constructor(
        private popupsNotifierService: PopupsNotifierService,
        private ref: ChangeDetectorRef,
        private formBuilder: FormBuilder,
        private contactsService: ContactsService
    ) {}

    ngOnInit(): void {
        this.form = this.formBuilder.group({
            firstName: [null, [Validators.required]],
            middleName: [null, [Validators.required]],
            lastName: [null, [Validators.required]],
            email: [
                null,
                [
                    Validators.required,
                    Validators.pattern(
                        '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'
                    ),
                ],
            ],
            groupId: [null, [Validators.required]],
            notificationsStatus: [false],
        });
        this.popupsNotifierService
            .getPopupStatus(this.popupName)
            .subscribe((res) => {
                this.show = res?.show;
                if (!this.show) {
                    this.resetForm();
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
            this.submitted.emit(this.form.value);
            this.closePopup();
        }
    }

    resetForm() {
        this.form.get('firstName').setValue(null);
        this.form.get('middleName').setValue(null);
        this.form.get('lastName').setValue(null);
        this.form.get('email').setValue(null);
        this.form.get('groupId').setValue(null);
        this.form.get('notificationsStatus').setValue(false);
        MarkFormGroupUntouched(this.form.controls);
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
}
