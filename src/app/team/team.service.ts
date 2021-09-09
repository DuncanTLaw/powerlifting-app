import { Injectable } from '@angular/core';
import { Storage } from '@capacitor/storage';

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  userTeam: string;
  teams = {
    none: '',
    // eslint-disable-next-line
    'Team Pape': '/assets/teamAvatars/TP.png',
    // eslint-disable-next-line
    OUPLC: '/assets/teamAvatars/OUPLC-logo.png'
  };

  constructor() {
    this.checkTeam();
  }

  setTeam = async (): Promise<void> => {
    const storeTeam = this.userTeam;

    await Storage.set({
      key: 'team',
      value: storeTeam
    });
  };

  checkTeam = async (): Promise<void> => {
    const { value } = await Storage.get({ key: 'team' });
    if (value) {
      this.userTeam = value;
    }
  };
}
