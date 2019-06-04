import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonnelStartComponent } from './personnel-start.component';

describe('PersonnelStartComponent', () => {
  let component: PersonnelStartComponent;
  let fixture: ComponentFixture<PersonnelStartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonnelStartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonnelStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
