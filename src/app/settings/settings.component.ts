import { Component, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, ModalController } from '@ionic/angular';
import { HelpService } from '../help/help.service';
import { ModeService } from './settings-storage/mode.service';
import { WeightUnitService } from './settings-storage/weight-unit.service';

interface LINKS {
  [website: string]: {
    name: string;
    icon: string;
    link: string;
  };
}

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  links: LINKS = {
    openPl: {
      name: 'Open Powerlifting',
      icon: 'list',
      link: 'https://www.openpowerlifting.org/u/duncanlaw'
    },
    instagram: {
      name: '@lawkout',
      icon: 'logo-instagram',
      link: 'https://www.instagram.com/lawkout/'
    },
    linkedin: {
      name: 'LinkedIn',
      icon: 'logo-linkedin',
      link: 'https://www.linkedin.com/in/duncan-law-1ba6501b2'
    }
  };

  constructor(
    private modalController: ModalController,
    public weightUnitService: WeightUnitService,
    public modeService: ModeService,
    private menuController: MenuController,
    private router: Router,
    private helpService: HelpService
  ) { }

  ngOnInit() {}

  dismissModal(): void {
    this.modalController.dismiss();
    this.menuController.close();
  }

  onClickButton(): void {
    this.menuController.close();
    this.helpService.currentRoute.next(this.router.url);
    this.dismissModal();
  }

  returnZero(): number {
    return 0;
  }
}
