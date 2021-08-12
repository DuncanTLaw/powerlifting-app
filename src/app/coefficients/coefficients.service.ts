import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { GenderCoeff } from '../numeric-tables/coefficient.model';
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
  male = true;
  benchOnly = false;

  dotsScale: GenderCoeff = DOTSCOEFF;

  glScale: GenderCoeff = GLCOEFF;

  ipfScale: GenderCoeff = IPFCOEFF;

  wilksScale: GenderCoeff = WILKSCOEFF;

  bluesConst: Blues = {
    half: 500,
    full: 560
  };

  calcDOTS(form: NgForm, total: number): number {
    const bw: number = form.value.weight;

    const c1 = this.male ? this.dotsScale.male.c1 : this.dotsScale.female.c1;
    const c2 = this.male ? this.dotsScale.male.c2 : this.dotsScale.female.c2;
    const c3 = this.male ? this.dotsScale.male.c3 : this.dotsScale.female.c3;
    const c4 = this.male ? this.dotsScale.male.c4 : this.dotsScale.female.c4;
    const c5 = this.male ? this.dotsScale.male.c5 : this.dotsScale.female.c5;

    return (total > 0) ? total * 500 / (-c1*bw**4 + c2*bw**3 - c3*bw**2 + c4*bw - c5) : 0;
  }

  calcGL(form: NgForm, total: number): number {
    const bw: number = form.value.weight;

    let c1: number;
    let c2: number;
    let c3: number;

    if (!this.benchOnly) {
      c1 = this.male ? this.glScale.male.c1 : this.glScale.female.c1;
      c2 = this.male ? this.glScale.male.c2 : this.glScale.female.c2;
      c3 = this.male ? this.glScale.male.c3 : this.glScale.female.c3;
    } else {
      c1 = this.male ? this.glScale.male.c1b : this.glScale.female.c1b;
      c2 = this.male ? this.glScale.male.c2b : this.glScale.female.c2b;
      c3 = this.male ? this.glScale.male.c3b : this.glScale.female.c3b;
    }

    return (total > 0) ? total * 100 / (c1 - c2*Math.E**(-c3*bw)) : 0;
  }

  calcIPF(form: NgForm, total: number): number {
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

  calcWilks(form: NgForm, total: number): number {
    const bw: number = form.value.weight;

    const c1 = this.male ? -this.wilksScale.male.c1 : this.wilksScale.female.c1;
    const c2 = this.male ? this.wilksScale.male.c2 : -this.wilksScale.female.c2;
    const c3 = this.male ? -this.wilksScale.male.c3 : this.wilksScale.female.c3;
    const c4 = this.male ? -this.wilksScale.male.c4 : -this.wilksScale.female.c4;
    const c5 = this.male ? this.wilksScale.male.c5 : this.wilksScale.female.c5;
    const c6 = this.male ? -this.wilksScale.male.c6 : -this.wilksScale.female.c6;
    console.log(c1, c2, c3, c4, c5, c6);
    return (total > 0) ?
      total * 500 / (c1 + c2*bw + c3*bw**2 + c4*bw**3 + c5*bw**4 + c6*bw**5) : 0;
  }

  calcBlues(form: NgForm, total: number): string {
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
