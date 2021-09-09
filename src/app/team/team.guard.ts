import { Injectable } from '@angular/core';
import { CanLoad, Router} from '@angular/router';
import { TeamService } from './team.service';

@Injectable({
  providedIn: 'root'
})
export class TeamGuard implements CanLoad {
  constructor(private teamService: TeamService, private router: Router) { }

  async canLoad(): Promise<boolean> {
    await this.teamService.checkTeam();
    if (!this.teamService.userTeam) {
      this.router.navigateByUrl('/team');
    }
    return (this.teamService.userTeam) ? true : false;
  }
}
