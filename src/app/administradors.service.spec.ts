import { TestBed } from '@angular/core/testing';

import { AdministradorsService } from './administradors.service';

describe('AdministradorsService', () => {
  let service: AdministradorsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdministradorsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
