import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonnelCreateComponent } from './personnel-create.component';

describe('PersonnelCreateComponent', () => {
  let component: PersonnelCreateComponent;
  let fixture: ComponentFixture<PersonnelCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonnelCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonnelCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
