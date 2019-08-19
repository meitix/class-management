import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticsStartComponent } from './statistics-start.component';

describe('StatisticsStartComponent', () => {
  let component: StatisticsStartComponent;
  let fixture: ComponentFixture<StatisticsStartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatisticsStartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatisticsStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
