import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, ModalController } from '@ionic/angular';
import { WeightUnitService } from './settings-storage/weight-unit.service';
import { FEDERATION } from '../meets/services/federation';
import { FederationService } from './settings-storage/federation.service';
import { GenderService } from './settings-storage/gender.service';

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
  userWC: string;
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
  wcList: string[] = [];
  version = '2.0.0';
  build = '3';

  constructor(
    private router: Router,
    private modalController: ModalController,
    public weightUnitService: WeightUnitService,
    private menuController: MenuController,
    private federationService: FederationService,
    private genderService: GenderService
  ) { }

  ngOnInit() {
    this.weightUnitService.userUnit.subscribe(unit => this.userUnit = unit);
    this.genderService.userGender.subscribe(gender => this.userGender = gender);
    this.federationService.checkFed().then(fed => {
      this.userFed = fed;
      this.getFeds();
    });
    this.federationService.checkClass().then(wc => this.userWC = wc);
  }

  getFeds(): void {
    for (const fed in this.feds) {
      if (fed) {
        this.fedList.push(fed);
      }
    }
    this.getWC();
  }

  getWC(): void {
    if (this.userFed) {
      for (const weightClass of this.feds[this.userFed][this.userGender]) {
        this.wcList.push(weightClass);
      }
    }
  }

  dismissModal(): void {
    this.modalController.dismiss();
    this.menuController.close();
  }

  onChangeUnit(): void {
    this.weightUnitService.setUnit(this.userUnit);
  }

  onChangeGender(): void {
    this.genderService.setGender(this.userGender);
    this.wcList = [];
    this.getWC();
  }

  onChangeFed(): void {
    this.federationService.setFed(this.userFed);
    this.wcList = [];
    this.getWC();
  }

  onChangeWC(): void {
    this.federationService.setClass(this.userWC);
  }

  returnZero(): number {
    return 0;
  }
}
