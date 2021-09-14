import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HelpService } from './help/help.service';
import { ThemesService } from './settings/settings-storage/themes.service';
import { TeamService } from './team/team.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit{

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
}
