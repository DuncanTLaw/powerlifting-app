import { Injectable } from '@angular/core';
import { Storage } from '@capacitor/storage';

const LB_IN_KG = 2.2046226218488;

@Injectable({
  providedIn: 'root'
})
export class WeightUnitService {
  userUnit = 'kg';

  constructor() { }

  setUnit = async (): Promise<void> => {
    const storeUnit = (this.userUnit === 'kg') ? 'kg' : 'lb';

    await Storage.set({
      key: 'unit',
      value: storeUnit
    });
  };

  checkUnit = async (): Promise<void> => {
    const { value } = await Storage.get({ key: 'unit' });
    if (value) {
      this.userUnit = (value === 'kg') ? 'kg' : 'lb';
    }
  };

  convertToKilo(weight: number): number {
    return (this.userUnit === 'lb') ? weight * LB_IN_KG : weight;
  }

  converToLb(weight: number): number {
    return (this.userUnit === 'lb') ? weight / LB_IN_KG : weight;
  }
}
