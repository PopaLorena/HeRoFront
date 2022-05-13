import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMeetingParticipantsComponent } from './view-meeting-participants.component';

describe('ViewMeetingParticipantsComponent', () => {
  let component: ViewMeetingParticipantsComponent;
  let fixture: ComponentFixture<ViewMeetingParticipantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewMeetingParticipantsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewMeetingParticipantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
