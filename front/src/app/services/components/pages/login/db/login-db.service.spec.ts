import { TestBed } from '@angular/core/testing';

import { LoginDbService } from './login-db.service';

describe('LoginDbService', () => {
  let service: LoginDbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginDbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
