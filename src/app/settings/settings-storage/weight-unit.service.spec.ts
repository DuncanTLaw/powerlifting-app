import { TestBed } from '@angular/core/testing';

import { WeightUnitService } from './weight-unit.service';

describe('TestService', () => {
  let service: WeightUnitService;
  const LB_IN_KG = 2.2046226218488;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WeightUnitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should convert lb to kg', () => {
    service.userUnit.next('lb');
    expect(service.convertToKg(500)).toBe(500 / LB_IN_KG);
  });

  it('should convert kg to lb', () => {
    service.userUnit.next('lb');
    expect(service.convertToLb(83)).toBe(83 * LB_IN_KG);
  });
});
