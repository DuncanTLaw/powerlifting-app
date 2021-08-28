import { Injectable } from '@angular/core';
import { Storage } from '@capacitor/storage';
import { WeightUnitService } from '../settings/weight-unit.service';

import { NgForm } from '@angular/forms';
import { GenderCoeff, GLModel } from '../numeric-tables/coefficient.model';
import { DOTSCOEFF } from '../numeric-tables/dots';
import { GLCOEFF } from '../numeric-tables/GL';
import { IPFCOEFF } from '../numeric-tables/IPF';
import { WILKSCOEFF } from '../numeric-tables/wilks';

export interface Blues {
  half: number;
  full: number;
}

@Injectable({
  providedIn: 'root',
})
export class CoeffService {
  gender: string;
  benchOnly = false;

  private dotsScale: GenderCoeff = DOTSCOEFF;

  private glScale: GLModel = GLCOEFF;

  private ipfScale: GenderCoeff = IPFCOEFF;

  private wilksScale: GenderCoeff = WILKSCOEFF;

  private bluesConst: Blues = {
    half: 500,
    full: 560
  };

  constructor(private weightUnitService: WeightUnitService) {}

  setGender = async (userGender: string) => {
    const storeGender = (userGender === 'male') ? 'male' : 'female';

    await Storage.set({
      key: 'gender',
      value: storeGender
    });
  };

  checkGender = async () => {
    const { value } = await Storage.get({ key: 'gender' });
    if (value) {
      this.gender = (value === 'male') ? 'male' : 'female';
    }
  };

  calcDOTS(form: NgForm, total: number): number {
    total = this.weightUnitService.convertToKilo(total);
    const bw: number = this.weightUnitService.convertToKilo(form.value.weight);
    const isMale = (this.gender === 'male') ? true : (this.gender === 'female') ? false : null;
    return total*this.dotsFunction(bw, isMale);
  }

  calcGL(form: NgForm, total: number): number {
    total = this.weightUnitService.convertToKilo(total);
    const bw: number = this.weightUnitService.convertToKilo(form.value.weight);
    const sex = this.gender;
    const event = (this.benchOnly) ? 'b' : 'sbd';
    const equipment = 'raw'; // hardcoded for now until later implementation of an 'Equipped' selector

    const params = this.glScale[sex][equipment][event];
    const denom = params[0] - (params[1] * Math.exp(-1.0 * params[2] * bw));

    let glp = (denom === 0) ? 0 : Math.max(0, total * 100.0 / denom);

    if (isNaN(glp) || bw < 35) {
      glp = 0;
    }

    return glp;
  }

  calcIPF(form: NgForm, total: number): number {
    total = this.weightUnitService.convertToKilo(total);
    const bw: number = this.weightUnitService.convertToKilo(form.value.weight);

    let c1: number;
    let c2: number;
    let c3: number;
    let c4: number;

    if (!this.benchOnly) {
      if (this.gender === 'male') {
        c1 = this.ipfScale.male.c1;
        c2 = this.ipfScale.male.c2;
        c3 = this.ipfScale.male.c3;
        c4 = this.ipfScale.male.c4;
      } else if (this.gender === 'female') {
        c1 = this.ipfScale.female.c1;
        c2 = this.ipfScale.female.c2;
        c3 = this.ipfScale.female.c3;
        c4 = this.ipfScale.female.c4;
      }
    } else {
      if (this.gender === 'male') {
        c1 = this.ipfScale.male.c1b;
        c2 = this.ipfScale.male.c2b;
        c3 = this.ipfScale.male.c3b;
        c4 = this.ipfScale.male.c4b;
      } else if (this.gender === 'female') {
        c1 = this.ipfScale.female.c1b;
        c2 = this.ipfScale.female.c2b;
        c3 = this.ipfScale.female.c3b;
        c4 = this.ipfScale.female.c4b;
      }
    }

    return (total > 0) ?
      500 + 100 * (
      (total - (c1 * Math.log(bw) - c2)) /
      (c3 * Math.log(bw) - c4)
      ) : 0;
  }

  calcWilks(form: NgForm, total: number): number {
    total = this.weightUnitService.convertToKilo(total);
    const bw: number = this.weightUnitService.convertToKilo(form.value.weight);

    let c1: number;
    let c2: number;
    let c3: number;
    let c4: number;
    let c5: number;
    let c6: number;

    if (this.gender === 'male') {
      c1 = -this.wilksScale.male.c1;
      c2 = this.wilksScale.male.c2;
      c3 = -this.wilksScale.male.c3;
      c4 = -this.wilksScale.male.c4;
      c5 = this.wilksScale.male.c5;
      c6 = -this.wilksScale.male.c6;
    } else if (this.gender === 'female') {
      c1 = this.wilksScale.female.c1;
      c2 = -this.wilksScale.female.c2;
      c3 = this.wilksScale.female.c3;
      c4 = -this.wilksScale.female.c4;
      c5 = this.wilksScale.female.c5;
      c6 = -this.wilksScale.female.c6;
    }
    return (total > 0) ?
      total * 500 / (c1 + c2*bw + c3*bw**2 + c4*bw**3 + c5*bw**4 + c6*bw**5) : 0;
  }

  calcBlues(form: NgForm, total: number): string {
    if (!this.benchOnly) { // Hard coded for now since Blues Committee does not give Blues for bench-only lifters (?)
      const ipfPoints: number = this.calcIPF(form, total);
      if (ipfPoints < this.bluesConst.half) {
        return 'None';
      } else if (ipfPoints >= this.bluesConst.half && ipfPoints < this.bluesConst.full) {
        return'Half Blue';
      } else {
        return 'Full Blue';
      }
    } else{
      return 'None';
    }
  }

  calcBluesGoal(form: NgForm): number {
    const goalBw: number = this.weightUnitService.convertToKilo(form.value.goalBw);

    let c1: number;
    let c2: number;
    let c3: number;
    let c4: number;

    if (this.gender === 'male') {
      c1 = this.ipfScale.male.c1;
      c2 = this.ipfScale.male.c2;
      c3 = this.ipfScale.male.c3;
      c4 = this.ipfScale.male.c4;
    } else if (this.gender === 'female') {
      c1 = this.ipfScale.female.c1;
      c2 = this.ipfScale.female.c2;
      c3 = this.ipfScale.female.c3;
      c4 = this.ipfScale.female.c4;
    }

    const goalIPF = (form.value.goalBlue === 'full') ?
      this.bluesConst.full : (form.value.goalBlue === 'half') ?
      this.bluesConst.half : null;

    return this.weightUnitService.convertToLb(
      (((goalIPF - 500) / 100) * (c3 * Math.log(goalBw) - c4) +
      (c1 * Math.log(goalBw) - c2))
    );
  }

  private dotsPoly(a: number, b: number, c: number, d: number, e: number, x: number): number {
    const x2 = x*x;
    const x3 = x2*x;
    const x4 = x3*x;
    return 500.0 / (a*x4 + b*x3 + c*x2 + d*x + e);
  }

  private dotsFunction(bw: number, isMale: boolean): number {
    const lBw = 40.0;
    const uBw = (isMale)? 210.0 : 150.0;
    bw = Math.min(Math.max(bw, lBw), uBw);
    if (isMale) {
      return this.dotsPoly(
        -this.dotsScale.male.c1,
        this.dotsScale.male.c2,
        -this.dotsScale.male.c3,
        this.dotsScale.male.c4,
        -this.dotsScale.male.c5,
        bw);
    } else {
      return this.dotsPoly(
        -this.dotsScale.female.c1,
        this.dotsScale.female.c2,
        -this.dotsScale.female.c3,
        this.dotsScale.female.c4,
        -this.dotsScale.female.c5,
        bw);
    }
  }
}
