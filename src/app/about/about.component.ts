import { Component, OnInit } from '@angular/core';
import { WeightUnitService } from '../settings/weight-unit.service';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import { HelpService } from '../help/help.service';
import { TeamService } from '../team/team.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  constructor(
    public teamService: TeamService,
    public weightUnitService: WeightUnitService,
    private menuController: MenuController,
    private router: Router,
    private helpService: HelpService
  ) { }

  ngOnInit() {
  }

  onClickButton(): void {
    this.menuController.close();
    this.helpService.currentRoute.next(this.router.url);
  }
}
