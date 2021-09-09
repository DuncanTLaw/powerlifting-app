import { Injectable } from '@angular/core';
import { Storage } from '@capacitor/storage';

interface TEAMSTRINGS {
  [team: string]: {
    light: string;
    dark: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  userTeam: string;
  teams: TEAMSTRINGS = {
    none: {
      light: '',
      dark: ''
    },
    // eslint-disable-next-line
    'Team Pape': {
      light: '/assets/teamAvatars/TP.png',
      dark: '/assets/teamAvatars/TP-dark.png'
    },
    // eslint-disable-next-line
    OUPLC: {
      light: '/assets/teamAvatars/OUPLC-logo.png',
      dark: '/assets/teamAvatars/OUPLC-logo.png'
    },
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
