import { Injectable } from '@angular/core';
import { Storage } from '@capacitor/storage';

@Injectable({
  providedIn: 'root'
})
export class ModeService {
  dark: boolean;
  mode = 'auto';
  prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

  constructor() { }

  setMode = async (): Promise<void> => {
    const storeMode = this.mode;

    await Storage.set({
      key: 'mode',
      value: storeMode
    });

    if (this.mode !== 'auto') {
      this.dark = (this.mode === 'dark') ? true : false;
    } else {
      this.dark = this.prefersDark.matches;
      this.prefersDark.addEventListener('change', e => {
        this.dark = e.matches;
      });
    }
    this.listenMode();
  };

  checkMode = async (): Promise<void> => {
    const { value } = await Storage.get({ key: 'mode' });
    if (value) {
      this.mode = value;
    }
    this.listenMode();
  };

  listenMode(): void {
    if (this.mode !== 'auto') {
      this.dark = (this.mode === 'dark') ? true : false;
    } else {
      this.dark = this.prefersDark.matches;
      this.prefersDark.addEventListener('change', e => {
        this.dark = e.matches;
      });
    }
  }
}
