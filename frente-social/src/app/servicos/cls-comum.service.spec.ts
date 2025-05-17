import { TestBed } from '@angular/core/testing';

import { ClsComumService } from './cls-comum.service';

describe('ClsComumService', () => {
  let service: ClsComumService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClsComumService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
