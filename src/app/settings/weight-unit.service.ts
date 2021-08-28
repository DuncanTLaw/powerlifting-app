import { Injectable } from '@angular/core';
import { Storage } from '@capacitor/storage';


type WeightUnit = 'kg' | 'lbs';

const KG: WeightUnit = 'kg';
const LBS: WeightUnit = 'lbs';

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
}
