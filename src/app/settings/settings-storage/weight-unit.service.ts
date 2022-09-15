import { Injectable } from '@angular/core';
import { Storage } from '@capacitor/storage';
import { BehaviorSubject } from 'rxjs';

const LB_IN_KG = 2.2046226218488;

@Injectable({
  providedIn: 'root'
})
export class WeightUnitService {
  userUnit: BehaviorSubject<string> = new BehaviorSubject<string>('kg');

  constructor() {
    this.checkUnit();
  }

  setUnit = async (unit: string): Promise<void> => {
    this.userUnit.next(unit);

    await Storage.set({
      key: 'unit',
      value: unit
    });
  };

  checkUnit = async (): Promise<void> => {
    const { value } = await Storage.get({ key: 'unit' });
    if (value) {
      this.userUnit.next(value);
    }
  };

  convertToKg(weight: number): number {
    return (this.userUnit.value === 'kg') ? weight : weight / LB_IN_KG ;
  }

  convertToLb(weight: number): number {
    return (this.userUnit.value === 'kg') ? weight : weight * LB_IN_KG;
  }
}
