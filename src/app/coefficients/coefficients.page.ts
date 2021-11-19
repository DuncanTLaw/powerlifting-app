import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PopoverController } from '@ionic/angular';
import { GenderService } from '../settings/settings-storage/gender.service';
import { WeightUnitService } from '../settings/settings-storage/weight-unit.service';

import { CoeffService } from './coefficients.service';
import { PopoverComponent } from './popover/popover.component';

@Component({
  selector: 'app-coefficients',
  templateUrl: './coefficients.page.html',
  styleUrls: ['./coefficients.page.scss'],
})
export class CoefficientsPage implements OnInit, OnDestroy {
  // get TD form from template
  // https://stackoverflow.com/questions/37093432/angular-2-template-driven-form-access-ngform-in-component
  @ViewChild('coeff', { static: true }) coeffForm: NgForm;

  // pointsSelected = 'IPF GL';
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
  pointList: {[point: string]: number} = {
    gl: 0,
    ipf: 0,
    dots: 0,
    wilks: 0
  };

  goalBlue = 'full';
  goalTotal: number;
  calcDiff = false;
  blueDiff: string;
  hBlueDiff: string;

  constructor(
    public weightUnitService: WeightUnitService,
    private coeffService: CoeffService,
    private popoverController: PopoverController,
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
      this.calcGoal(this.coeffForm);
      this.calcDelta(this.coeffForm);
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
        // this.calcTot(form);
      }
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

  onSwitch(): void {
    if (this.segmentSelected === 'total') {
      this.result = (this.result === 'points') ? 'total' : 'points';
    } else {
      this.result = 'points';
    }
    this.tempResult = this.result;
  }

  async presentPopover(ev: any): Promise<void> {
    const popover = await this.popoverController.create({
      component: PopoverComponent,
      event: ev,
      translucent: true
    });
    await popover.present();
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

  // private calcTot(form: NgForm): void {
  //   if (this.userGender && form.value.weight && form.value.points) {
  //     this.onSwitchTot(form, form.value.points);
  //   }
  // }
}
