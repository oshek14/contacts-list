import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
} from '@angular/core';
import { Router } from '@angular/router';
import { IHttpContact } from 'src/app/core/models/http-contacts.model';
import { IHttpGroup } from 'src/app/core/models/http-groups.model';

@Component({
    selector: 'contact-details',
    templateUrl: './contact-details.component.html',
    styleUrls: ['./contact-details.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactDetailsComponent implements OnInit {
    @Input() activeContact: IHttpContact;
    @Input() allGroups: Array<IHttpGroup>;

    @Output() delete = new EventEmitter();
    @Output() editClick = new EventEmitter();

    constructor(private router: Router) {}

    ngOnInit(): void {}

    get initials() {
        return (
            this.activeContact?.firstName[0].toUpperCase() +
            this.activeContact?.lastName[0].toUpperCase()
        );
    }

    get group() {
        let group = '';
        let id = this.activeContact?.groupId;
        if (this.allGroups) {
            group = this.allGroups.find((group) => {
                return group.id == id;
            })?.name;
        }
        return group;
    }

    edit() {
        if (this.activeContact) {
            this.editClick.emit(this.activeContact);
        }
    }

    deleteRecord(id) {
        this.delete.emit(id);
        this.router.navigate(['contacts']);
    }

    share() {
        let mailText = 'mailto:oshek14@freeuni.edu.ge+?subject=share';
        window.location.href = mailText;
    }
}
