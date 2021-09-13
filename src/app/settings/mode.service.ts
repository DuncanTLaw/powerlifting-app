import { Injectable } from '@angular/core';
import { Storage } from '@capacitor/storage';

@Injectable({
  providedIn: 'root'
})
export class ModeService {
  mode = 'auto';
  prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

  constructor() {
    this.prefersDark.addEventListener('change', (e) => console.log(e));
  }

  setMode = async (): Promise<void> => {
    const storeMode = this.mode;

    await Storage.set({
      key: 'keep',
      value: storeMode
    });
    document.body.classList.toggle('dark', true);
  };

  checkAwake = async (): Promise<void> => {
    const { value } = await Storage.get({ key: 'keep' });
    if (value) {
      this.mode = value;
    }
  };
}
