import { TestBed } from '@angular/core/testing';

import { GetDietsService } from './get-diets.service';

describe('GetDietsService', () => {
  let service: GetDietsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetDietsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
