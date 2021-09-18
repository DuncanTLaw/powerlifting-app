import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, ModalController } from '@ionic/angular';
import { HelpService } from '../help/help.service';
import { WeightUnitService } from './settings-storage/weight-unit.service';
import { FEDERATION } from '../meets/federation';
import { CoeffService } from '../coefficients/coefficients.service';

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
  userUnit: string;
  userGender: string;
  userFed: string;
  userWC: number | string;
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
  fedList: string[] = [];
  feds = FEDERATION;
  wcList: number[] = [];

  constructor(
    private router: Router,
    private modalController: ModalController,
    public weightUnitService: WeightUnitService,
    private menuController: MenuController,
    private helpService: HelpService,
    private coeffService: CoeffService
  ) { }

  ngOnInit() {
    this.weightUnitService.userUnit.subscribe(unit => this.userUnit = unit);
    this.coeffService.checkGender().then(
      () => {
        if (this.coeffService.gender) {
          this.userGender = this.coeffService.gender;
        }
      }
    );
    this.getFeds();
    this.getWC();
  }

  getFeds(): void {
    for (const fed in this.feds) {
      if (fed) {
        this.fedList.push(fed);
      }
    }
  }

  getWC(): void {
    if (this.fedList && this.userFed) {
      for (const weightClass of this.feds[this.userFed][this.userGender]) {
        console.log(weightClass);
      }
    }
  }

  dismissModal(): void {
    this.modalController.dismiss();
    this.menuController.close();
  }

  onClickButton(): void {
    this.menuController.close();
    this.helpService.currentRoute.next(this.router.url);
    this.dismissModal();
  }

  onChangeUnit(): void {
    this.weightUnitService.setUnit(this.userUnit);
  }

  onChangeGender(): void {
    this.coeffService.setGender(this.userGender);
  }

  onChangeFed(): void {

  }

  onChangeWC(): void {

  }

  returnZero(): number {
    return 0;
  }
}
