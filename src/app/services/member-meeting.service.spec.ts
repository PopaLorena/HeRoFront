import { TestBed } from '@angular/core/testing';

import { MemberMeetingService } from './member-meeting.service';

describe('MemberMeetingService', () => {
  let service: MemberMeetingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MemberMeetingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
