import { TestBed } from '@angular/core/testing';

import { TrackingRequestService } from './tracking-request.service';

describe('TrackingRequestService', () => {
  let service: TrackingRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrackingRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
