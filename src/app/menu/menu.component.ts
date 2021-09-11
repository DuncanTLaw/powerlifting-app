import { Component, OnInit } from '@angular/core';
import { WeightUnitService } from '../settings/weight-unit.service';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import { HelpService } from '../help/help.service';
import { TeamService } from '../team/team.service';
import { ModalController } from '@ionic/angular';
import { SettingsComponent } from '../settings/settings.component';

@Component({
  selector: 'app-about',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  constructor(
    public modalController: ModalController,
    public teamService: TeamService,
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

  async presentModal(): Promise<void> {
    const modal = await this.modalController.create({
      component: SettingsComponent
    });
    return await modal.present();
  }
}
