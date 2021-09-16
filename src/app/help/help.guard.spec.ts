import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { HelpGuard } from './help.guard';

describe('HelpGuard', () => {
  let guard: HelpGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule]
    });
    guard = TestBed.inject(HelpGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
