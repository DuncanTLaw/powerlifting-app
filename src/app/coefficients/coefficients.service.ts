import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { GenderCoeff } from '../numeric-tables/coefficient.model';
import { DOTSCOEFF } from '../numeric-tables/dots';
import { GLCOEFF } from '../numeric-tables/GL';

@Injectable({
  providedIn: 'root',
})
export class CoeffService {
  male = true;
  total: number;

  dotsScale: GenderCoeff = DOTSCOEFF;
  dotsPoints: number;

  glScale: GenderCoeff = GLCOEFF;
  glPoints: number;

  calcDOTS(form: NgForm): void {
    this.male = form.value.gender;
    const bw = form.value.weight;
    this.total = form.value.total;

    const c1 = this.male ?  this.dotsScale.male.c1 : this.dotsScale.female.c1;
    const c2 = this.male ?  this.dotsScale.male.c2 : this.dotsScale.female.c2;
    const c3 = this.male ?  this.dotsScale.male.c3 : this.dotsScale.female.c3;
    const c4 = this.male ?  this.dotsScale.male.c4 : this.dotsScale.female.c4;
    const c5 = this.male ?  this.dotsScale.male.c5 : this.dotsScale.female.c5;

    this.dotsPoints = this.total * 500 / (-c1*bw**4 + c2*bw**3 - c3*bw**2 + c4*bw - c5);
  }

  calcGL(form: NgForm): void {
    this.male = form.value.gender;
    const bw = form.value.weight;
    this.total = form.value.total;
    const benchOnly = false;

    if (!benchOnly) {
      const c1 = this.male ?  this.glScale.male.c1 : this.glScale.female.c1;
      const c2 = this.male ?  this.glScale.male.c2 : this.glScale.female.c2;
      const c3 = this.male ?  this.glScale.male.c3 : this.glScale.female.c3;

      this.glPoints = this.total * 100 / (c1 - c2*Math.E**(-c3*bw));
    } else {
      const c1b = this.male ?  this.glScale.male.c1b : this.glScale.female.c1b;
      const c2b = this.male ?  this.glScale.male.c2b : this.glScale.female.c2b;
      const c3b = this.male ?  this.glScale.male.c3b : this.glScale.female.c3b;

      this.glPoints = this.total * 100 / (c1b - c2b*Math.E**(-c3b*bw));
    }
  }

}
