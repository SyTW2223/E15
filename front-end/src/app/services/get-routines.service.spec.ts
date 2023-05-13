import { TestBed } from '@angular/core/testing';

import { GetRoutinesService } from './get-routines.service';

describe('GetRoutinesService', () => {
  let service: GetRoutinesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetRoutinesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
