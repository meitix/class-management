import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassStartComponent } from './class-start.component';

describe('ClassStartComponent', () => {
  let component: ClassStartComponent;
  let fixture: ComponentFixture<ClassStartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassStartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
