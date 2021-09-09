import { Component, OnInit } from '@angular/core';
import { HelpService } from '../help/help.service';
import { TeamService } from './team.service';

@Component({
  selector: 'app-team',
  templateUrl: './team.page.html',
  styleUrls: ['./team.page.scss'],
})
export class TeamPage implements OnInit {

  constructor(public teamService: TeamService, public helpService: HelpService) { }

  ngOnInit() {
  }

  returnZero(): number {
    return 0;
  }

  onSubmitTeam(): void {
    this.teamService.setTeam();
  }
}
