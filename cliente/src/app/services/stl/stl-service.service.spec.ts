import { TestBed } from '@angular/core/testing';

import { StlServiceService } from './stl-service.service';

describe('StlServiceService', () => {
  let service: StlServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StlServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
