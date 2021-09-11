import { Component, OnInit } from '@angular/core';
import { HelpService } from '../help/help.service';
import { ThemesService } from '../settings/themes.service';
import { TeamService } from './team.service';

@Component({
  selector: 'app-team',
  templateUrl: './team.page.html',
  styleUrls: ['./team.page.scss'],
})
export class TeamPage implements OnInit {
  inputTeam: string;
  inputPassword: string;
  passwordCorrect = false;

  constructor(
    public teamService: TeamService,
    public helpService: HelpService,
    private themeService: ThemesService
  ) { }

  ngOnInit() {
    this.inputTeam = (this.teamService.userTeam) ? this.teamService.userTeam : null;
    if (this.teamService.userTeam === 'none') {
      this.passwordCorrect = true;
    }
  }

  returnZero(): number {
    return 0;
  }

  authenticateInput(): void {
    if (this.inputTeam === 'none') {
      this.passwordCorrect = true;
    } else if (this.inputPassword === this.teamService.teams[this.inputTeam].password) {
      this.passwordCorrect = true;
    } else {
      this.passwordCorrect = false;
    }
  }

  onSubmitTeam(): void {
    this.teamService.userTeam = this.inputTeam;
    this.teamService.setTeam();
    if (this.teamService.userTeam === 'OUPLC') {
      this.themeService.enableTheme('ouplc-theme');
    } else {
      this.themeService.disableTheme('ouplc-theme');
    }
  }
}
