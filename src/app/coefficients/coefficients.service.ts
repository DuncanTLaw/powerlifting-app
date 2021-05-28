import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class DateService {
  male: boolean;
  c1: number;
  c2: number;
  c3: number;
  c4: number;
  userGender: string;

  blueAchieved: string;
  ipfPoints: number;
  userTotal: number;
  totalSelected: boolean;
  squatNo: number;
  benchNo: number;
  deadliftNo: number;

  goalIPF: number;
  goalTotal: number;

  constructor() {}

  onSelect(event: any): void {
    this.totalSelected = (event === 'sbd') ? false : true;
  }

  coeffChange(form: NgForm): void {
    this.male = (form.value.gender === 'M') ? true : false;
    this.userGender = form.value.gender;
    if (this.male) {
      this.c1 = 310.67;
      this.c2 = 857.785;
      this.c3 = 53.216;
      this.c4 = 147.0835;
    } else {
      this.c1 = 125.1435;
      this.c2 = 228.03;
      this.c3 = 34.5246;
      this.c4 = 86.8301;
    }
  }

  calcBlue(form: NgForm): void {
    this.coeffChange(form);
    this.userGender = form.value.gender;
    if (this.totalSelected === true) {
      this.userTotal = form.value.total;
    } else {
      this.userTotal = form.value.squat + form.value.bench + form.value.deadlift;
      this.squatNo = form.value.squat;
      this.benchNo = form.value.bench;
      this.deadliftNo = form.value.deadlift;
    }
    this.ipfPoints = 500 + 100 * (
      (this.userTotal - (this.c1 * Math.log(form.value.weight) - this.c2)) /
      (this.c3 * Math.log(form.value.weight) - this.c4)
    );
    if (this.ipfPoints && form.value.gender && form.value.weight) {
      if (this.ipfPoints < 500) {
        this.blueAchieved = 'None';
      } else if (this.ipfPoints >= 500 && this.ipfPoints < 560) {
        this.blueAchieved = 'Half Blue';
      } else {
        this.blueAchieved = 'Full Blue';
      }
    }
  }

  calcGoal(form: NgForm): void {
    this.coeffChange(form);
    if (form.value.goalBlue === 'full') {
      this.goalIPF = 560;
    } else {
      this.goalIPF = 500;
    }
    if (form.value.gender && form.value.weight && form.value.goalBlue) {
      this.goalTotal = +(((this.goalIPF - 500) / 100) * (this.c3 * Math.log(form.value.weight) - this.c4) +
        (this.c1 * Math.log(form.value.weight) - this.c2)).toFixed(2);
    }
  }

}
