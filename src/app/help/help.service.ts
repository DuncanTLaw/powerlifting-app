import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Storage } from '@capacitor/storage';

@Injectable({
  providedIn: 'root'
})
export class HelpService {
  currentRoute = new BehaviorSubject<string>('');
  haveWelcomed: boolean;

  constructor() { }

  setWelcomed = async (): Promise<void> => {
    const storeWelcomed = 'welcomed';

    await Storage.set({
      key: 'welcomed',
      value: storeWelcomed
    });
  };

  checkWelcomed = async (): Promise<void> => {
    const { value } = await Storage.get({ key: 'welcomed' });
    this.haveWelcomed = (value) ? true : false;
  };
}
