import { TestBed } from '@angular/core/testing';

import { SupportserviceService } from './supportservice.service';

describe('SupportserviceService', () => {
  let service: SupportserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SupportserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
