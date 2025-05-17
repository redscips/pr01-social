import { TestBed } from '@angular/core/testing';

import { ClsSocialAPIService } from './clsSocialAPI.service';

describe('ClsSocialAPIService', () => {
  let service: ClsSocialAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClsSocialAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
