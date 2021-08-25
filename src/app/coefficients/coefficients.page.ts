import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Storage } from '@capacitor/storage';

import { CoeffService } from './coefficients.service';

@Component({
  selector: 'app-coefficients',
  templateUrl: './coefficients.page.html',
  styleUrls: ['./coefficients.page.scss'],
})
export class CoefficientsPage implements OnInit {
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

  constructor(private coeffService: CoeffService) { }

  ngOnInit() {
    this.checkGender();
  }

  setGender = async () => {
    const gender = (this.userGender) ? 'male' : 'female';

    await Storage.set({
      key: 'gender',
      value: gender
    });
  };

  checkGender = async () => {
    if (this.userGender) {
      const { value } = await Storage.get({ key: 'gender' });
      this.userGender = (value === 'male') ? 'male' : 'female';
    }
  };

  onChangeGender(form: NgForm): void {
    this.coeffService.gender = this.userGender;
    this.onCalcPoints(form);
    this.setGender();
  }

  segmentChanged(event: any): void {
    this.segmentSelected = event.target.value;
    if(this.segmentSelected === 'onlyBP') {
      this.coeffService.benchOnly = true;
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

  onCalcPoints(form: NgForm): void {
    this.checkSegment(form);
    this.bluesSelected = (this.pointsSelected !== 'Blues') ? false : true;
    this.userPoints = (this.pointsSelected !== 'Blues') ? null : 'None';

    if (this.userGender) {
      if (form.value.weight && this.userTotal) {
        this.onSwitchPoints(form, this.pointsSelected, this.userTotal);
      } else if (this.coeffService.benchOnly && form.value.bp){
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
}
