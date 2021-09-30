import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Storage } from '@capacitor/storage';

@Injectable({
  providedIn: 'root'
})
export class HelpService {
  currentRoute: BehaviorSubject<string> = new BehaviorSubject<string>('/app/tabs/rpe');
  haveWelcomed: boolean;

  constructor() { }

  setWelcomed = async (welcome: boolean): Promise<void> => {
    const storeWelcomed = (welcome) ? 'welcomed' : 'notWelcomed';

    await Storage.set({
      key: 'welcomed',
      value: storeWelcomed
    });
  };

  checkWelcomed = async (): Promise<void> => {
    const { value } = await Storage.get({ key: 'welcomed' });
    this.haveWelcomed = (value === 'welcomed') ? true : false;
  };
}
