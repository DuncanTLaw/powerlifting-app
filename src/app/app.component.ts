import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, MenuController, ModalController } from '@ionic/angular';
import { JoyrideService } from 'ngx-joyride';
import { JoyrideOptions } from 'ngx-joyride/lib/models/joyride-options.class';
import { WelcomedService } from './settings/settings-storage/welcomed.service';
import { SettingsComponent } from './settings/settings.component';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit{

  constructor(
    private router: Router,
    public modalController: ModalController,
    private menuController: MenuController,
    private readonly joyrideService: JoyrideService,
    private alertController: AlertController,
    private welcomedService: WelcomedService
  ) { }

  async ngOnInit() {
    const welcomed = await this.welcomedService.checkWelcomed();
    if (!welcomed) {
      this.welcomedService.setWelcomed();
      // this.openTutorial();
      this.presentAlert();
    }
  }

  openTutorial(): void {
    this.router.navigateByUrl('/app/tabs/rpe');
    this.menuController.close();
    const options: JoyrideOptions = {
      steps: [
        'rpe1@app/tabs/rpe',
        'rpe2@app/tabs/rpe',
        'coeff@app/tabs/coeff',
        'meets1@app/tabs/meets',
        'meets2@app/tabs/meets',
        'timer1@app/tabs/timer',
        'timer2@app/tabs/timer',
        'loader1@app/tabs/loader',
        'loader2@app/tabs/loader',
        'loaded1@app/tabs/loader',
        'menu1',
        'menu2'
      ]
    };
    this.joyrideService.startTour(options);
  }

  async presentModal(): Promise<void> {
    const modal = await this.modalController.create({
      component: SettingsComponent
    });
    return await modal.present();
  }

  closeMenu(): void {
    this.menuController.close();
  }

  async presentAlert() {
    // this.presentModal();
    const alert = await this.alertController.create({
      // header: 'You\'re all up to speed.',
      // message: 'You can revisit the tutorial again from the side menu.',
      // buttons: ['Start lifting']
      header: 'A quick tip.',
      subHeader: 'Go to settings to add your information.',
      message: `
        This new app update brings a new competition-tracking feature.<br/>
        <br/>
        To make sure your federation and weight class is automaticaly filled in, set them in Settings.<br/>
        <br/>
        Access Settings by opening the side menu (accessible by swiping right from near the left edge of the screen on any page)
        then tap 'Settings' on the top.
      `,
      buttons: ['Start lifting']
    });

    await alert.present();
  }
}
