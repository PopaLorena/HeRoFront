import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTrainingParticipantsComponent } from './view-training-participants.component';

describe('ViewTrainingParticipantsComponent', () => {
  let component: ViewTrainingParticipantsComponent;
  let fixture: ComponentFixture<ViewTrainingParticipantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewTrainingParticipantsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewTrainingParticipantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
