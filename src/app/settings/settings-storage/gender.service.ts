import { Injectable } from '@angular/core';
import { Storage } from '@capacitor/storage';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GenderService {
  userGender: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor() {
    this.checkGender();
  }

  setGender = async (gender: string): Promise<void> => {
    this.userGender.next(gender);

    await Storage.set({
      key: 'gender',
      value: gender
    });
  };

  checkGender = async (): Promise<void> => {
    const { value } = await Storage.get({ key: 'gender' });
    if (value) {
      this.userGender.next(value);
    }
  };
}
