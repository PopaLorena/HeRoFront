import { TestBed } from '@angular/core/testing';

import { MemberTrainingService } from './member-training.service';

describe('MemberTrainingService', () => {
  let service: MemberTrainingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MemberTrainingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
