import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMeetingsComponent } from './view-meetings.component';

describe('ViewMeetingsComponent', () => {
  let component: ViewMeetingsComponent;
  let fixture: ComponentFixture<ViewMeetingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewMeetingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewMeetingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
