import { Injectable } from '@angular/core';
import { Storage } from '@capacitor/storage';

@Injectable({
  providedIn: 'root'
})
export class FederationService {

  constructor() { }

  setFed = async (fed: string): Promise<void> => {
    const storeFed = fed;

    await Storage.set({
      key: 'fed',
      value: storeFed
    });
  };

  checkFed = async (): Promise<string> => {
    const { value } = await Storage.get({ key: 'fed' });
    if (value) {
      return value;
    }
  };

  setClass = async (wc: string): Promise<void> => {
    const storeClass = wc;

    await Storage.set({
      key: 'class',
      value: storeClass
    });
  };

  checkClass = async (): Promise<string> => {
    const { value } = await Storage.get({ key: 'class' });
    if (value) {
      return value;
    }
  };
}
