import { TestBed } from '@angular/core/testing';

import { TypeRequestPriceService } from './type-request-price.service';

describe('TypeRequestPriceService', () => {
  let service: TypeRequestPriceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypeRequestPriceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
