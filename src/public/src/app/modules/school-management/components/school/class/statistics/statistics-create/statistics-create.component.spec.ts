import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticsCreateComponent } from './statistics-create.component';

describe('StatisticsCreateComponent', () => {
  let component: StatisticsCreateComponent;
  let fixture: ComponentFixture<StatisticsCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatisticsCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatisticsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
