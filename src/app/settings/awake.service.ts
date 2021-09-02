import { Injectable } from '@angular/core';
import { Storage } from '@capacitor/storage';

@Injectable({
  providedIn: 'root'
})
export class AwakeService {
  allowAwake = false;

  constructor() { }

  setAwake = async (): Promise<void> => {
    const storeAwake = (this.allowAwake) ? 'awake' : 'sleep';

    await Storage.set({
      key: 'keep',
      value: storeAwake
    });
  };

  checkAwake = async (): Promise<void> => {
    const { value } = await Storage.get({ key: 'keep' });
    if (value) {
      this.allowAwake = (value === 'awake') ? true : false;
    }
  };
}
