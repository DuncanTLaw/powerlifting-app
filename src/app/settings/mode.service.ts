import { Injectable } from '@angular/core';
import { Storage } from '@capacitor/storage';

@Injectable({
  providedIn: 'root'
})
export class ModeService {
  mode = 'auto';

  constructor() { }

  setMode = async (): Promise<void> => {
    const storeMode = this.mode;

    await Storage.set({
      key: 'keep',
      value: storeMode
    });
    document.body.setAttribute('color-theme', 'light');
  };

  checkAwake = async (): Promise<void> => {
    const { value } = await Storage.get({ key: 'keep' });
    if (value) {
      this.mode = value;
    }
  };
}
