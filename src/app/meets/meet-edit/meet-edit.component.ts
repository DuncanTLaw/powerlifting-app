import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { DateService } from '../services/date.service';
import { MeetFormGroupTemplate } from '../services/meet-form.model';
import { MeetsService, StoredMeetObj } from '../services/meets.service';

@Component({
  selector: 'app-meet-edit',
  templateUrl: './meet-edit.component.html',
  styleUrls: ['./meet-edit.component.scss'],
})
export class MeetEditComponent implements OnInit {
  @Input() date: string;
  today: string;

  meet: StoredMeetObj;
  editMeet = new FormGroup(MeetFormGroupTemplate.template);

  constructor(
    private modalController: ModalController,
    private meetsService: MeetsService,
    private dateService: DateService
  ) { }

  ngOnInit() {
    this.meetsService.getMeet(this.date).then(storedData => {
      this.meet = storedData;
      this.editMeet.patchValue(this.meet);
    });
    this.today = this.dateService.getDateString();
  }

  dismissModal(): void {
    if (this.editMeet.value.date !== this.meet.date) {
      this.meetsService.removeMeet(this.meet.date);
    }
    this.meetsService.setMeet(this.editMeet);
    this.modalController.dismiss();
  }
}
