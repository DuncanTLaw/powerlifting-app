import { Injectable } from '@angular/core';
import { Storage } from '@capacitor/storage';
import { BehaviorSubject } from 'rxjs';

const LB_IN_KG = 2.2046226218488;

@Injectable({
  providedIn: 'root'
})
export class WeightUnitService {
  userUnit = new BehaviorSubject<string>('kg');

  constructor() {
    this.checkUnit();
  }

  setUnit = async (event: any): Promise<void> => {
  this.userUnit.next(event.detail.value);
    let storeUnit: string;
    this.userUnit.subscribe(
      unit => {storeUnit = (unit === 'kg') ? 'kg' : 'lb';}
    );

    await Storage.set({
      key: 'unit',
      value: storeUnit
    });
  };

  checkUnit = async (): Promise<void> => {
    const { value } = await Storage.get({ key: 'unit' });
    if (value) {
      this.userUnit.next((value === 'kg') ? 'kg' : 'lb');
    }
  };

  convertToKg(weight: number): number {
    return (this.userUnit.value === 'kg') ? weight : weight / LB_IN_KG ;
  }

  convertToLb(weight: number): number {
    return (this.userUnit.value === 'kg') ? weight : weight * LB_IN_KG;
  }
}
