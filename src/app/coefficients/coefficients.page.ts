import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { GenderService } from '../settings/settings-storage/gender.service';
import { WeightUnitService } from '../settings/settings-storage/weight-unit.service';

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
  userTotal = 0;
  userSq: number;
  userBp: number;
  userDl: number;
  userPoints: number | string;
  result = 'points';
  tempResult = 'points';
  pointList: {[point: string]: number} = {
    gl: 0,
    ipf: 0,
    dots: 0,
    wilks: 0
  };

  constructor(
    public weightUnitService: WeightUnitService,
    private coeffService: CoeffService,
    private genderService: GenderService
  ) { }

  ngOnInit() {
    this.genderService.userGender.subscribe(gender => this.userGender = gender);
    this.weightUnitService.userUnit.subscribe(() => {
      if (this.segmentSelected === 'points') {
        this.calcPoints(this.coeffForm);
      } else {
        // this.calcTot(this.coeffForm);
      }
    });
  }

  ngOnDestroy() {
    this.weightUnitService.userUnit.unsubscribe();
    this.genderService.userGender.unsubscribe();
  }

  onChangeGender(form: NgForm): void {
    this.coeffService.gender = this.userGender;
    this.calcPoints(form);
    // this.calcTot(form);
    this.genderService.setGender(this.userGender);
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
    if (form.dirty) {
      if (this.result === 'points') {
        this.calcPoints(form);
      } else {
        this.calcTot(form);
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

  private fillPoints(form: NgForm, total: number): void {
    this.pointList.gl = this.coeffService.calcGL(form, total);
    this.pointList.ipf = this.coeffService.calcIPF(form, total);
    this.pointList.dots = this.coeffService.calcDOTS(form, total);
    this.pointList.wilks = this.coeffService.calcWilks(form, total);
  }

  private calcPoints(form: NgForm): void {
    this.checkSegment(form);
    if (this.userGender) {
      if (form.value.weight && form.value.total) {
        this.fillPoints(form, form.value.total);
      } else if (this.segmentSelected === 'onlyBP' && form.value.bp){
        this.fillPoints(form, form.value.bp);
      } else {
        this.pointList = {
          gl: 0,
          ipf: 0,
          dots: 0,
          wilks: 0
        };
      }
    }
  }

  private calcTot(form: NgForm): void {
    if (this.userGender && form.value.weight && form.value.points) {
      this.onSwitchTot(form, this.pointsSelected, form.value.points);
    }
  }
}
