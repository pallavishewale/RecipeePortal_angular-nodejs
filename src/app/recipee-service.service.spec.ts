import { TestBed } from '@angular/core/testing';

import { RecipeeServiceService } from './recipee-service.service';

describe('RecipeeServiceService', () => {
  let service: RecipeeServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecipeeServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
