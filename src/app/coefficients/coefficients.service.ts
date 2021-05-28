import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { GenderCoeff } from '../numeric-tables/coefficient.model';
import { DOTSCOEFF } from '../numeric-tables/dots';
import { GLCOEFF } from '../numeric-tables/GL';
import { IPFCOEFF } from '../numeric-tables/IPF';

@Injectable({
  providedIn: 'root',
})
export class CoeffService {
  male = true;
  total: number;
  benchOnly: false;

  dotsScale: GenderCoeff = DOTSCOEFF;
  dotsPoints: number;

  glScale: GenderCoeff = GLCOEFF;
  glPoints: number;

  ipfScale: GenderCoeff = IPFCOEFF;
  ipfPoints: number;

  calcDOTS(form: NgForm): void {
    this.male = form.value.gender;
    const bw = form.value.weight;
    this.total = form.value.total;

    const c1 = this.male ?  this.dotsScale.male.c1 : this.dotsScale.female.c1;
    const c2 = this.male ?  this.dotsScale.male.c2 : this.dotsScale.female.c2;
    const c3 = this.male ?  this.dotsScale.male.c3 : this.dotsScale.female.c3;
    const c4 = this.male ?  this.dotsScale.male.c4 : this.dotsScale.female.c4;
    const c5 = this.male ?  this.dotsScale.male.c5 : this.dotsScale.female.c5;

    this.dotsPoints = (this.total > 0)? this.total * 500 / (-c1*bw**4 + c2*bw**3 - c3*bw**2 + c4*bw - c5) : 0;
  }

  calcGL(form: NgForm): void {
    this.male = form.value.gender;
    const bw = form.value.weight;
    this.total = form.value.total;

    let c1: number;
    let c2: number;
    let c3: number;

    if (!this.benchOnly) {
      c1 = this.male ?  this.glScale.male.c1 : this.glScale.female.c1;
      c2 = this.male ?  this.glScale.male.c2 : this.glScale.female.c2;
      c3 = this.male ?  this.glScale.male.c3 : this.glScale.female.c3;
    } else {
      c1 = this.male ?  this.glScale.male.c1b : this.glScale.female.c1b;
      c2 = this.male ?  this.glScale.male.c2b : this.glScale.female.c2b;
      c3 = this.male ?  this.glScale.male.c3b : this.glScale.female.c3b;
    }

    this.glPoints = (this.total > 0)? this.total * 100 / (c1 - c2*Math.E**(-c3*bw)) : 0;
  }

  calcIPF(form: NgForm): void {
    this.male = form.value.gender;
    const bw = form.value.weight;
    this.total = form.value.total;

    let c1: number;
    let c2: number;
    let c3: number;
    let c4: number;

    if (!this.benchOnly) {
      c1 = this.male ?  this.ipfScale.male.c1 : this.ipfScale.female.c1;
      c2 = this.male ?  this.ipfScale.male.c2 : this.ipfScale.female.c2;
      c3 = this.male ?  this.ipfScale.male.c3 : this.ipfScale.female.c3;
      c4 = this.male ?  this.ipfScale.male.c4 : this.ipfScale.female.c4;
    } else {
      c1 = this.male ?  this.ipfScale.male.c1b : this.ipfScale.female.c1b;
      c2 = this.male ?  this.ipfScale.male.c2b : this.ipfScale.female.c2b;
      c3 = this.male ?  this.ipfScale.male.c3b : this.ipfScale.female.c3b;
      c4 = this.male ?  this.ipfScale.male.c4b : this.ipfScale.female.c4b;
    }

    this.ipfPoints = 500 + 100 * (
      (this.total - (c1 * Math.log(form.value.weight) - c2)) /
      (c3 * Math.log(form.value.weight) - c4)
    );
  }

}
