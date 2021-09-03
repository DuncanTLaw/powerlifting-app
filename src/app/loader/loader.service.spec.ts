import { TestBed } from '@angular/core/testing';

import { LoaderService } from './loader.service';

describe('TestService', () => {
  let service: LoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get the red from 25kg', () => {
    expect(service.getKGBadgeColor(25)).toBe('danger');
  });
});
