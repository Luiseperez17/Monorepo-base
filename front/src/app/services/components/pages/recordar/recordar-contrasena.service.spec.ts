import { TestBed } from '@angular/core/testing';

import { RecordarContrasenaService } from './recordar-contrasena.service';

describe('RecordarContrasenaService', () => {
  let service: RecordarContrasenaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecordarContrasenaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
