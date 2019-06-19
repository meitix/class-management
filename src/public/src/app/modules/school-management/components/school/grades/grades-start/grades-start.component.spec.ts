import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GradesStartComponent } from './grades-start.component';

describe('GradesStartComponent', () => {
  let component: GradesStartComponent;
  let fixture: ComponentFixture<GradesStartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GradesStartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GradesStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
