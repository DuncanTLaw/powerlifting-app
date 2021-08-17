import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

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
  userMale: boolean;
  userBw: number;
  userTotal: number;
  userSq: number;
  userBp: number;
  userDl: number;
  userPoints: any;

  constructor(private coeffService: CoeffService) { }

  ngOnInit() {
  }

  onChangeGender(form: NgForm): void {
    this.coeffService.male = this.userMale;
    this.onCalcPoints(form);
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

    if (typeof this.userMale === 'boolean') {
      if (form.value.weight && this.userTotal) {
        this.onSwitchPoints(form, this.pointsSelected, this.userTotal);
      } else if (this.coeffService.benchOnly && form.value.bp){
        this.onSwitchPoints(form, this.pointsSelected, form.value.bp);
      } else {
        if (this.pointsSelected !== 'Blues') {
          this.bluesSelected = false;
          this.userPoints = null;
        } else {
          this.bluesSelected = true;
          this.userPoints = 'None';
        }
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
