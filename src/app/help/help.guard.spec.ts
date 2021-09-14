import { TestBed } from '@angular/core/testing';

import { HelpGuard } from './help.guard';

describe('HelpGuard', () => {
  let guard: HelpGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(HelpGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
