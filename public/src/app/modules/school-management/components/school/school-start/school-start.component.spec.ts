import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolStartComponent } from './school-start.component';

describe('SchoolStartComponent', () => {
  let component: SchoolStartComponent;
  let fixture: ComponentFixture<SchoolStartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolStartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
