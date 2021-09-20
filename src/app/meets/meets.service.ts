import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Storage } from '@capacitor/storage';

export interface StoredMeetObj {
  name: string;
  fed: string;
  wc: string;
  bp: boolean;
  date: string;
  weighIn: string;
  location: string;
  notes: string;
};

@Injectable({
  providedIn: 'root'
})
export class MeetsService {

  constructor() { }

  setMeet = async (form: FormGroup): Promise<void> => {
    const meetID = 'meet' + form.value.date;
    const formStringified = JSON.stringify(form.value);

    await Storage.set({
      key: meetID,
      value: formStringified
    });
  };

  checkMeet = async (): Promise<StoredMeetObj[]> => {
    let meetList: string[];
    const meets: StoredMeetObj[] = [];
    await this.listMeet().then(list => meetList = list);
    if (meetList) {
      for (const meet of meetList) {
        const { value } = await Storage.get({ key: meet });
        if (value) {
          meets.push(JSON.parse(value));
        }
      }
    }
    return this.sortMeet(meets);
  };

  listMeet = async (): Promise<string[]> => {
    const meetList: string[] = [];
    const { keys } = await Storage.keys();
    if (keys) {
      for (const key of keys) {
        if (key.includes('meet')) {
          meetList.push(key);
        }
      }
    }
    return meetList;
  };

  removeMeet = async (meetDate: string): Promise<void> => {
    const meetID = 'meet' + meetDate;
    await Storage.remove({ key: meetID });
  };

  sortMeet(meetList: StoredMeetObj[]): StoredMeetObj[] {
    return meetList.sort((a, b) => +new Date(a.date) - +new Date(b.date));
  }
}
