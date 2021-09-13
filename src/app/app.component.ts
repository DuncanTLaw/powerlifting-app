import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HelpService } from './help/help.service';
import { ThemesService } from './settings/themes.service';
import { TeamService } from './team/team.service';

interface PAGES {
  [pageName: string]: {
    label: string;
    icon: string;
    colour: string;
  };
}

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit{
  pages: PAGES = {
    rpe: {
      label: 'RPE',
      icon: 'stats-chart',
      colour: 'var(--ion-color-tertiary)'
    },
    coeff: {
      label: 'Coefficients',
      icon: 'calculator',
      colour: 'var(--ion-color-warning)'
    },
    timer: {
      label: 'Timer',
      icon: 'timer-sharp',
      colour: 'var(--ion-color-danger)'
    },
    loader: {
      label: 'Loader',
      icon: 'barbell-sharp',
      colour: 'var(--ion-color-success)'
    },
  };

  constructor(
    private themeService: ThemesService,
    private teamService: TeamService,
    private helpService: HelpService,
    private router: Router
  ) { }

  async ngOnInit() {
    await this.teamService.checkTeam();
    if (this.teamService.userTeam === 'OUPLC') {
      this.themeService.enableTheme('ouplc-theme');
    } else {
      this.themeService.disableTheme('ouplc-theme');
    }
    await this.helpService.checkWelcomed();
    if (!this.helpService.haveWelcomed) {
      this.router.navigateByUrl('/help');
      this.helpService.setWelcomed();
    }
  }

  returnZero(): number {
    return 0;
  }
}
