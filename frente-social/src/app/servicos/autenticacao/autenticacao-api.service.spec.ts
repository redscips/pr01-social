import { TestBed } from '@angular/core/testing';

import { AutenticacaoAPIService } from './autenticacao-api.service';

describe('AutenticacaoAPIService', () => {
  let service: AutenticacaoAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AutenticacaoAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
