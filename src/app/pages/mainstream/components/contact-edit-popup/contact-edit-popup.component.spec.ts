import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactAddPopupComponent } from './contact-add-popup.component';

describe('ContactAddPopupComponent', () => {
  let component: ContactAddPopupComponent;
  let fixture: ComponentFixture<ContactAddPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactAddPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactAddPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
