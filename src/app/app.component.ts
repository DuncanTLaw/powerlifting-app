import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, ModalController } from '@ionic/angular';
import { HelpService } from './help/help.service';
import { ModeService } from './settings/settings-storage/mode.service';
import { SettingsComponent } from './settings/settings.component';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit{

  constructor(
    private router: Router,
    private helpService: HelpService,
    public modeService: ModeService,
    public modalController: ModalController,
    private menuController: MenuController,
  ) { }

  ngOnInit() {
    this.modeService.checkMode();
  }

  openTutorial(): void {
    this.helpService.currentRoute.next(this.router.url);
    this.helpService.setWelcomed(false);
    this.menuController.close();
    this.router.navigateByUrl('/help');
  }

  async presentModal(): Promise<void> {
    const modal = await this.modalController.create({
      component: SettingsComponent
    });
    return await modal.present();
  }
}
