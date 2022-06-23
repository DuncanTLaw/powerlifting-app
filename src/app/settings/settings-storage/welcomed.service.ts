import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Storage } from '@capacitor/storage';

@Injectable({
  providedIn: 'root'
})
export class WelcomedService {

  constructor() { }

  setWelcomed = async (): Promise<void> => {
    const storeWelcomed = 'welcomed';

    await Storage.set({
      key: 'welcomed',
      value: storeWelcomed
    });
  };

  checkWelcomed = async (): Promise<boolean> => {
    const { value } = await Storage.get({ key: 'welcomed' });
    return (value) ? true : false;
  };
}
