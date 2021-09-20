import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CoeffService } from '../coefficients/coefficients.service';
import { FederationService } from '../settings/settings-storage/federation.service';
import { DateService } from './date.service';
import { FEDERATION } from './federation';
import { MeetsService, StoredMeetObj } from './meets.service';

@Component({
  selector: 'app-meets',
  templateUrl: './meets.page.html',
  styleUrls: ['./meets.page.scss'],
})
export class MeetsPage implements OnInit {
  addMeet = false;
  editMeet = false;
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

  meets: StoredMeetObj[];
  earliestMeet: {name: string; daysOut: string} = {name: '', daysOut: ''};

  constructor(
    private federationService: FederationService,
    private coeffService: CoeffService,
    private meetsService: MeetsService,
    public dateService: DateService
  ) { }

  ngOnInit() {
    this.coeffService.checkGender().then(
      () => {
        if (this.coeffService.gender) {
          this.userGender = this.coeffService.gender;
        }
      }
    );
    this.today = this.dateService.getDateString();
    this.updateView();
    this.patchFed();
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

  onClickAddMeet = (): boolean => this.addMeet = !this.addMeet;

  onSubmit(): void {
    this.addMeet = false;
    this.newMeet.patchValue({ date: this.newMeet.value.date.split('T')[0] }); // remove timestamp
    this.meetsService.setMeet(this.newMeet);
    this.updateView();
    this.newMeet.reset();
    this.patchFed();
  }

  onEdit = (): boolean => this.editMeet = !this.editMeet;

  onCloseEdit = (): boolean => this.editMeet = false;

  deleteMeet(meetDate: string): void {
    const meetID = 'meet' + meetDate;
    this.meetsService.removeMeet(meetID);
    this.updateView();
  }

  private updateView(): void {
    this.meetsService.checkMeet().then(storedMeets => {
      this.meets = storedMeets;
      if (this.meets.length > 0) {
        this.earliestMeet.name = this.meets[0].name;
        this.earliestMeet.daysOut = this.dateService.getDaysOut(this.meets[0].date);
      }
    });
  }

  private patchFed(): void {
    this.federationService.checkFed().then(fedStored => {
      this.newMeet.patchValue({ fed: fedStored });
      this.getFeds();
    });
    this.federationService.checkClass().then(wcStored => this.newMeet.patchValue({ wc: wcStored }));
  }
}
