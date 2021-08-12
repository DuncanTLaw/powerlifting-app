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
  userMale = true;
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
  }

  onCalcPoints(form: NgForm): void {
    if (form.value.weight && this.userTotal) {
      if (this.segmentSelected === 'threeLifts') {
        this.userTotal = form.value.sq + form.value.bp + form.value.dl;
        this.userSq = form.value.sq;
        this.userBp = form.value.bp;
        this.userDl = form.value.dl;
      } else if (this.segmentSelected === 'total') {
        this.userTotal = form.value.total;
      }
      this.onSwitchPoints(form, this.pointsSelected, this.userTotal);
    } else {
      if (this.pointsSelected!=='Blues') {
        this.bluesSelected = false;
        this.userPoints = null;
      } else {
        this.bluesSelected = true;
        this.userPoints = 'None';
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
