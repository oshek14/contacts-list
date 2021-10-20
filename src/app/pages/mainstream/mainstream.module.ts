import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainstreamRoutingModule } from './mainstream-routing.module';
import { ContactsComponent } from './containers/contacts/contacts.component';
import { ContactsListComponent } from './components/contacts-list/contacts-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { ContactDetailsComponent } from './components/contact-details/contact-details.component';
import { ContactAddPopupComponent } from './components/contact-add-popup/contact-add-popup.component';
import { ContactEditPopupComponent } from './components/contact-edit-popup/contact-edit-popup.component';

@NgModule({
    declarations: [
        ContactsComponent,
        ContactsListComponent,
        ContactDetailsComponent,
        ContactAddPopupComponent,
        ContactEditPopupComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MainstreamRoutingModule,
        SharedModule,
    ],
})
export class MainstreamModule {}
