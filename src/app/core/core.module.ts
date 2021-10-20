import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { appReducers } from './store/app.reducer';
import { appEffects } from './store/app.effect';
import { ContactsService } from './services/contacts.service';
import { GroupsService } from './services/groups.service';
import { HttpContactsService } from './http-services/http-contacts.service';
import { HttpGroupsService } from './http-services/http-groups.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [],
  imports: [
    HttpClientModule,
    StoreModule.forRoot(appReducers),
    EffectsModule.forRoot(appEffects),
  ],
  providers: [
    ContactsService,
    GroupsService,
    HttpContactsService,
    HttpGroupsService
  ],
})
export class CoreModule {}
