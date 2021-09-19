import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  constructor() { }

  getDateString(): string {
    const date = new Date();
    return date.toISOString().split('T')[0];
  }

  transformDateStr(input: string): string {
    const dateInput = new Date(input);
    const year = dateInput.getFullYear();
    const month = this.getStrFromNum('M', dateInput.getMonth());
    const date = dateInput.getDate();
    const day = this.getStrFromNum('D', dateInput.getDay());
    const dateStr = `${month} ${date}, ${year} (${day})`;
    return dateStr;
  }

  getStrFromNum(time: string, num: number): string {
    if (time === 'M') {
      switch (num) {
        case 0: return 'Jan';
        case 1: return 'Feb';
        case 2: return 'Mar';
        case 3: return 'Apr';
        case 4: return 'May';
        case 5: return 'Jun';
        case 6: return 'Jul';
        case 7: return 'Aug';
        case 8: return 'Sep';
        case 9: return 'Oct';
        case 10: return 'Nov';
        case 11: return 'Dec';
      }
    } else {
      switch (num) {
        case 0: return 'Sun';
        case 1: return 'Mon';
        case 2: return 'Tue';
        case 3: return 'Wed';
        case 4: return 'Thu';
        case 5: return 'Fri';
        case 6: return 'Sat';
      }
    }
  }

  getReadableTime(time: string): string {
    const dateTime = new Date(time);
    return dateTime.toLocaleString('en-GB', { hour: 'numeric', minute: 'numeric', hour12: true });
  }
}
