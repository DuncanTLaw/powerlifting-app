import { TestBed } from '@angular/core/testing';

import { AwakeService } from './awake.service';

describe('AwakeService', () => {
  let service: AwakeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AwakeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
