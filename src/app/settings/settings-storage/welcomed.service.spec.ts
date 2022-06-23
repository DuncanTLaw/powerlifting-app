import { TestBed } from '@angular/core/testing';

import { WelcomedService } from './welcomed.service';

describe('WelcomedService', () => {
  let service: WelcomedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WelcomedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
