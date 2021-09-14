import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, ModalController } from '@ionic/angular';
import { HelpService } from './help/help.service';
import { ThemesService } from './settings/settings-storage/themes.service';
import { TeamService } from './team/team.service';
import { SettingsComponent } from './settings/settings.component';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit{

  constructor(
    private themeService: ThemesService,
    public teamService: TeamService,
    private helpService: HelpService,
    private router: Router,
    public modalController: ModalController,
    private menuController: MenuController,
  ) { }

  async ngOnInit() {
    await this.teamService.checkTeam().then(() => {
      if (this.teamService.userTeam === 'OUPLC') {
        this.themeService.enableTheme('ouplc-theme');
      } else {
        this.themeService.disableTheme('ouplc-theme');
      }
    });
  }

  openTutorial(): void {
    this.helpService.currentRoute.next(this.router.url);
    this.helpService.setWelcomed(false);
    this.menuController.close().then(() => this.router.navigateByUrl('/help'));
  }

  async presentModal(): Promise<void> {
    const modal = await this.modalController.create({
      component: SettingsComponent
    });
    return await modal.present();
  }
}
