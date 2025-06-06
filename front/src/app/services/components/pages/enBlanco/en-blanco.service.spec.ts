import { TestBed } from '@angular/core/testing';

import { EnBlancoService } from './en-blanco.service';

describe('EnBlancoService', () => {
  let service: EnBlancoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EnBlancoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
