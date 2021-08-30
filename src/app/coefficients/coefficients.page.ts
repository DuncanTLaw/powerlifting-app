import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { WeightUnitService } from '../settings/weight-unit.service';

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
  bluesSelected = false;
  userGender: string;
  userBw: number;
  userTotal: number;
  userSq: number;
  userBp: number;
  userDl: number;
  userPoints: any;

  goalBlue = 'full';
  goalTotal: number;
  calcDiff = false;
  blueDiff: string;
  hBlueDiff: string;

  constructor(
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
    this.coeffService.setGender(this.userGender);
  }

  segmentChanged(event: any): void {
    this.segmentSelected = event.target.value;
    if(this.segmentSelected === 'onlyBP') {
      this.coeffService.benchOnly = true;
    } else {
      this.coeffService.benchOnly = false;
    }
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

  calcPoints(form: NgForm): void {
    this.checkSegment(form);
    this.bluesSelected = (this.pointsSelected !== 'Blues') ? false : true;
    this.userPoints = (this.pointsSelected !== 'Blues') ? null : 'None';

    if (this.userGender) {
      if (form.value.weight && this.userTotal) {
        this.onSwitchPoints(form, this.pointsSelected, this.userTotal);
      } else if (this.segmentSelected === 'onlyBP' && form.value.bp){
        this.onSwitchPoints(form, this.pointsSelected, form.value.bp);
      }
    }
  }

  onSwitchPoints(form: NgForm, pointSelected: string, total: number): void {
    switch (pointSelected) {
      case 'IPF GL':
        this.bluesSelected = false;
        this.userPoints = this.coeffService.calcGL(form, total);
        break;
      case 'IPF':
        this.bluesSelected = false;
        this.userPoints = this.coeffService.calcIPF(form, total);
        break;
      case 'Dots':
        this.bluesSelected = false;
        this.userPoints = this.coeffService.calcDOTS(form, total);
        break;
      case 'Wilks':
        this.bluesSelected = false;
        this.userPoints = this.coeffService.calcWilks(form, total);
        break;
      case 'Blues':
        this.bluesSelected = true;
        this.userPoints = this.coeffService.calcBlues(form, total);
        break;
    }
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
}
