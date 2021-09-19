import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CoeffService } from '../coefficients/coefficients.service';
import { FederationService } from '../settings/settings-storage/federation.service';
import { FEDERATION } from './federation';

@Component({
  selector: 'app-meets',
  templateUrl: './meets.page.html',
  styleUrls: ['./meets.page.scss'],
})
export class MeetsPage implements OnInit {
  hasMeets: boolean;
  addMeet = false;
  newMeet = new FormGroup({
    name: new FormControl('', Validators.required),
    fed: new FormControl(''),
    wc: new FormControl(''),
    bp: new FormControl(false),
    date: new FormControl('', Validators.required),
    weighIn: new FormControl(''),
    location: new FormControl(''),
    notes: new FormControl('')
  });
  today: string;
  fedList: string[] = [];
  feds = FEDERATION;
  wcList: string[] = [];
  userGender: string;

  constructor(
    private federationService: FederationService,
    private coeffService: CoeffService
  ) { }

  ngOnInit() {
    this.coeffService.checkGender().then(
      () => {
        if (this.coeffService.gender) {
          this.userGender = this.coeffService.gender;
        }
      }
    );
    this.getDateString();
    this.federationService.checkFed().then(fedStored => {
      this.newMeet.patchValue( {fed: fedStored} );
      this.getFeds();
    });
    this.federationService.checkClass().then(wcStored => this.newMeet.patchValue({ wc: wcStored }));
  }

  getFeds(): void {
    for (const fed in this.feds) {
      if (fed) {
        this.fedList.push(fed);
      }
    }
    if (this.newMeet.value.fed) {
      this.getWC();
    }
  }

  getWC(): void {
    if (this.userGender) {
      for (const weightClass of this.feds[this.newMeet.value.fed][this.userGender]) {
        this.wcList.push(weightClass);
      }
    } else {
      for (const weightClass of this.feds[this.newMeet.value.fed].male) {
        this.wcList.push(weightClass);
      }
      for (const weightClass of this.feds[this.newMeet.value.fed].female) {
        this.wcList.push(weightClass);
      }
    }
  }

  onChangeFed(): void {
    this.wcList = [];
    this.getWC();
  }

  onClickAddMeet(): void {
    this.addMeet = !this.addMeet;
  }

  onSubmit(): void {
    this.addMeet = false;
    console.log(this.newMeet);
  }

  getDateString(): void {
    const date = new Date();
    this.today = date.toISOString().split('T')[0];
  }
}
