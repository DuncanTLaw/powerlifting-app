import { Injectable } from '@angular/core';
import { Storage } from '@capacitor/storage';

@Injectable({
  providedIn: 'root'
})
export class FederationService {

  constructor() { }

  setFed = async (fed: string): Promise<void> => {
    await Storage.set({
      key: 'fed',
      value: fed
    });
  };

  checkFed = async (): Promise<string> => {
    const { value } = await Storage.get({ key: 'fed' });
    if (value) {
      return value;
    }
  };

  setClass = async (wc: string): Promise<void> => {
    await Storage.set({
      key: 'class',
      value: wc
    });
  };

  checkClass = async (): Promise<string> => {
    const { value } = await Storage.get({ key: 'class' });
    if (value) {
      return value;
    }
  };
}
