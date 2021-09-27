import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CoeffService } from '../coefficients/coefficients.service';
import { FederationService } from '../settings/settings-storage/federation.service';
import { DateService } from './services/date.service';
import { FEDERATION } from './services/federation';
import { MeetsService, StoredMeetObj } from './services/meets.service';
import { ModalController } from '@ionic/angular';
import { MeetEditComponent } from './meet-edit/meet-edit.component';
import { MeetFormGroupTemplate } from './services/meet-form.model';
import { GenderService } from '../settings/settings-storage/gender.service';

@Component({
  selector: 'app-meets',
  templateUrl: './meets.page.html',
  styleUrls: ['./meets.page.scss'],
})
export class MeetsPage implements OnInit {
  addMeet = false;
  editMeets = false;
  newMeet = new FormGroup(MeetFormGroupTemplate.template);
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
    public dateService: DateService,
    private genderService: GenderService,
    private modalController: ModalController
  ) { }

  ngOnInit() {
    this.genderService.checkGender().then(
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
    this.meetsService.setMeet(this.newMeet);
    this.updateView();
    this.newMeet.reset();
    this.patchFed();
  }

  onEdit = (): boolean => this.editMeets = !this.editMeets;

  onCloseEdit = (): boolean => this.editMeets = false;

  deleteMeet(meetDate: string): void {
    this.meetsService.removeMeet(meetDate);
    this.updateView();
  }

  onEditMeet(meetDate: string): void {
    this.presentModal(meetDate);
  }

  private async presentModal(meetDate: string): Promise<void> {
    const modal = await this.modalController.create({
      component: MeetEditComponent,
      componentProps: { date: meetDate }
    });
    modal.onWillDismiss().then(() => {
      this.updateView();
    });
    return await modal.present();
  }

  private updateView(): void {
    this.meetsService.checkMeets().then(storedMeets => {
      this.meets = storedMeets;
      if (this.meets.length > 0) {
        for (const meet of this.meets) {
          const meetDate = new Date(meet.date);
          meetDate.setHours(0, 0, 0, 0);
          const todayDate = new Date();
          todayDate.setHours(0, 0, 0, 0);
          if (meetDate < todayDate) {
            this.meetsService.removeMeet(meet.date);
          }
        }
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
