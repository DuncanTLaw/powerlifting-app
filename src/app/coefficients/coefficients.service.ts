import { Injectable } from '@angular/core';
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
  male: boolean;
  benchOnly = false;

  dotsScale: GenderCoeff = DOTSCOEFF;

  glScale: GLModel = GLCOEFF;

  ipfScale: GenderCoeff = IPFCOEFF;

  wilksScale: GenderCoeff = WILKSCOEFF;

  bluesConst: Blues = {
    half: 500,
    full: 560
  };

  dotsPoly(a: number, b: number, c: number, d: number, e: number, x: number): number {
    const x2 = x*x;
    const x3 = x2*x;
    const x4 = x3*x;
    return 500.0 / (a*x4 + b*x3 + c*x2 + d*x + e);
  }

  dotsFunction(bw: number, isMale: boolean): number {
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

  calcDOTS(form: NgForm, total: number): number {
    if (typeof this.male === 'boolean') {
      const bw: number = form.value.weight;
      return total*this.dotsFunction(bw, this.male);
    }
  }

  calcGL(form: NgForm, total: number): number {
    if (typeof this.male === 'boolean') {
      const bw: number = form.value.weight;
      const sex = (this.male === true) ? 'male' : (this.male === false) ? 'female' : null;
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
  }

  calcIPF(form: NgForm, total: number): number {
    if (typeof this.male === 'boolean') {
      const bw: number = form.value.weight;

      let c1: number;
      let c2: number;
      let c3: number;
      let c4: number;

      if (!this.benchOnly) {
        c1 = this.male ? this.ipfScale.male.c1 : this.ipfScale.female.c1;
        c2 = this.male ? this.ipfScale.male.c2 : this.ipfScale.female.c2;
        c3 = this.male ? this.ipfScale.male.c3 : this.ipfScale.female.c3;
        c4 = this.male ? this.ipfScale.male.c4 : this.ipfScale.female.c4;
      } else {
        c1 = this.male ? this.ipfScale.male.c1b : this.ipfScale.female.c1b;
        c2 = this.male ? this.ipfScale.male.c2b : this.ipfScale.female.c2b;
        c3 = this.male ? this.ipfScale.male.c3b : this.ipfScale.female.c3b;
        c4 = this.male ? this.ipfScale.male.c4b : this.ipfScale.female.c4b;
      }

      return (total > 0) ?
        500 + 100 * (
        (total - (c1 * Math.log(bw) - c2)) /
        (c3 * Math.log(form.value.weight) - c4)
        ) : 0;
    }
  }

  calcWilks(form: NgForm, total: number): number {
    if (typeof this.male === 'boolean') {
      const bw: number = form.value.weight;

      const c1 = this.male ? -this.wilksScale.male.c1 : this.wilksScale.female.c1;
      const c2 = this.male ? this.wilksScale.male.c2 : -this.wilksScale.female.c2;
      const c3 = this.male ? -this.wilksScale.male.c3 : this.wilksScale.female.c3;
      const c4 = this.male ? -this.wilksScale.male.c4 : -this.wilksScale.female.c4;
      const c5 = this.male ? this.wilksScale.male.c5 : this.wilksScale.female.c5;
      const c6 = this.male ? -this.wilksScale.male.c6 : -this.wilksScale.female.c6;
      return (total > 0) ?
        total * 500 / (c1 + c2*bw + c3*bw**2 + c4*bw**3 + c5*bw**4 + c6*bw**5) : 0;
    }
  }

  calcBlues(form: NgForm, total: number): string {
    if (typeof this.male === 'boolean') {
      const ipfPoints: number = this.calcIPF(form, total);
      if (ipfPoints < this.bluesConst.half) {
        return 'None';
      } else if (ipfPoints >= this.bluesConst.half && ipfPoints < this.bluesConst.full) {
        return'Half Blue';
      } else {
        return 'Full Blue';
      }
    }
  }

}
