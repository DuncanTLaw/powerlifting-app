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
    form.patchValue({ date: form.value.date.split('T')[0] }); // remove timestamp
    const meetID = 'meet' + form.value.date;
    const formStringified = JSON.stringify(form.value);

    await Storage.set({
      key: meetID,
      value: formStringified
    });
  };

  checkMeets = async (): Promise<StoredMeetObj[]> => {
    let meetList: string[];
    const meets: StoredMeetObj[] = [];
    await this.listMeets().then(list => meetList = list);
    if (meetList) {
      for (const meet of meetList) {
        const { value } = await Storage.get({ key: meet });
        if (value) {
          meets.push(JSON.parse(value));
        }
      }
    }
    return this.sortMeets(meets);
  };

  listMeets = async (): Promise<string[]> => {
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

  getMeet = async (meetDate: string): Promise<StoredMeetObj> => {
    const meetID = 'meet' + meetDate;
    const { value } = await Storage.get({ key: meetID });
    if (value) {
      return JSON.parse(value);
    }
  };

  private sortMeets(meetList: StoredMeetObj[]): StoredMeetObj[] {
    return meetList.sort((a, b) => +new Date(a.date) - +new Date(b.date));
  }
}
