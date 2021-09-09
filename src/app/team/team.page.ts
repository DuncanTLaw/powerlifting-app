import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TeamService } from './team.service';

@Component({
  selector: 'app-team',
  templateUrl: './team.page.html',
  styleUrls: ['./team.page.scss'],
})
export class TeamPage implements OnInit {

  constructor(public teamService: TeamService, private router: Router) { }

  ngOnInit() {
  }

  returnZero(): number {
    return 0;
  }

  onSubmitTeam(): void {
    this.teamService.setTeam();
    this.router.navigateByUrl('');
  }
}
