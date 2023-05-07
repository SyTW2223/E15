import { TestBed } from '@angular/core/testing';

import { GetGymsService } from './get-gyms.service';

describe('GetGymsService', () => {
  let service: GetGymsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetGymsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
