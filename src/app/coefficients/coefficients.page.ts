import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { WeightUnitService } from '../settings/weight-unit.service';
import { TeamService } from '../team/team.service';

import { CoeffService } from './coefficients.service';

@Component({
  selector: 'app-coefficients',
  templateUrl: './coefficients.page.html',
  styleUrls: ['./coefficients.page.scss'],
})
export class CoefficientsPage implements OnInit, OnDestroy {
  // get TD form from template
  // https://stackoverflow.com/questions/37093432/angular-2-template-driven-form-access-ngform-in-component
  @ViewChild('coeff', { static: true }) coeffForm: NgForm;

  pointsSelected = 'IPF GL';
  segmentSelected = 'total';
  userGender: string;
  userBw: number;
  userTotal: number;
  userSq: number;
  userBp: number;
  userDl: number;
  userPoints: number | string;
  result = 'points';
  tempResult = 'points';

  goalBlue = 'full';
  goalTotal: number;
  calcDiff = false;
  blueDiff: string;
  hBlueDiff: string;

  constructor(
    public teamService: TeamService,
    public weightUnitService: WeightUnitService,
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
    this.weightUnitService.userUnit.subscribe(() => {
      this.calcPoints(this.coeffForm);
      this.calcTot(this.coeffForm);
      this.calcGoal(this.coeffForm);
      this.calcDelta(this.coeffForm);
    });
  }

  ngOnDestroy() {
    this.weightUnitService.userUnit.unsubscribe();
  }

  onChangeGender(form: NgForm): void {
    this.coeffService.gender = this.userGender;
    this.calcPoints(form);
    this.calcTot(form);
    this.coeffService.setGender(this.userGender);
  }

  segmentChanged(event: any): void {
    this.segmentSelected = event.target.value;
    if(this.segmentSelected === 'onlyBP') {
      this.coeffService.benchOnly = true;
    } else {
      this.coeffService.benchOnly = false;
    }
    this.result = (this.segmentSelected!=='total') ? 'points' : this.tempResult;
  }

  checkSegment(form: NgForm): void {
    if (this.segmentSelected === 'threeLifts') {
      this.userTotal = form.value.sq + form.value.bp + form.value.dl;
      this.userSq = form.value.sq;
      this.userBp = form.value.bp;
      this.userDl = form.value.dl;
    } else if (this.segmentSelected === 'total') {
      this.userTotal = form.value.total;
    } else if (this.segmentSelected === 'onlyBP') {
      if (form.value.total) {
        this.userTotal = null; // when user switches to `Bench` the value from `Total` should be wiped
      }
      this.userBp = form.value.bp;
    }
  }

  calcResult(form: NgForm): void {
    this.result = (this.pointsSelected === 'Blues') ? 'points' : this.result;
    if (form.dirty) {
      if (this.result === 'points') {
        this.calcPoints(form);
      } else {
        this.calcTot(form);
      }
    }
  }

  onSwitchPoints(form: NgForm, pointSelected: string, total: number): void {
    switch (pointSelected) {
      case 'IPF GL':
        this.userPoints = this.coeffService.calcGL(form, total);
        break;
      case 'IPF':
        this.userPoints = this.coeffService.calcIPF(form, total);
        break;
      case 'DOTS':
        this.userPoints = this.coeffService.calcDOTS(form, total);
        break;
      case 'Wilks':
        this.userPoints = this.coeffService.calcWilks(form, total);
        break;
      case 'Blues':
        this.userPoints = this.coeffService.calcBlues(form, total);
        break;
    }
    if (typeof this.userPoints === 'number') {
      this.userPoints = Math.round(this.userPoints * 100) / 100;
    }
  }

  onSwitchTot(form: NgForm, pointSelected: string, points: number): void {
    switch (pointSelected) {
      case 'IPF GL':
        this.userTotal = this.coeffService.calcGLTot(form, points);
        break;
      case 'IPF':
        this.userTotal = this.coeffService.calcIPFTot(form, points);
        break;
      case 'DOTS':
        this.userTotal = this.coeffService.calcDOTSTot(form, points);
        break;
      case 'Wilks':
        this.userTotal = this.coeffService.calcWilksTot(form, points);
        break;
    }
    this.userTotal = Math.round(this.userTotal * 100) / 100;
  }

  calcGoal(form: NgForm): void {
    if (this.userGender && form.value.goalBw && form.value.goalBlue) {
      this.goalTotal = this.coeffService.calcBluesGoal(form);
    }
  }

  onClickCalc = (): boolean => this.calcDiff = !this.calcDiff;;

  calcDelta(form: NgForm): void {
    const unitUsed = this.weightUnitService.userUnit.value;
    if (this.goalTotal && form.value.tTotal) {
      if (this.goalTotal < form.value.tTotal) {
        this.blueDiff = 'achieved';
        this.hBlueDiff = 'achieved';
      } else {
        this.blueDiff = (this.goalTotal - form.value.tTotal).toFixed(2) + unitUsed + ' remaining';
        this.hBlueDiff = (this.goalTotal - form.value.tTotal).toFixed(2) + unitUsed + ' remaining';
      }
    }
  }

  onSwitch(): void {
    if (this.segmentSelected === 'total') {
      this.result = (this.result === 'points') ? 'total' : 'points';
    } else {
      this.result = 'points';
    }
    this.tempResult = this.result;
  }

  private calcPoints(form: NgForm): void {
    this.checkSegment(form);
    this.userPoints = (this.pointsSelected !== 'Blues') ? null : null;

    if (this.userGender) {
      if (form.value.weight && form.value.total) {
        this.onSwitchPoints(form, this.pointsSelected, form.value.total);
      } else if (this.segmentSelected === 'onlyBP' && form.value.bp){
        this.onSwitchPoints(form, this.pointsSelected, form.value.bp);
      }
    }
  }

  private calcTot(form: NgForm): void {
    if (this.userGender && form.value.weight && form.value.points) {
      this.onSwitchTot(form, this.pointsSelected, form.value.points);
    }
  }
}
