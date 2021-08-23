import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RPEPct, RPEPCTTABLE } from '../numeric-tables/RPE-pct';

@Component({
  selector: 'app-rpe',
  templateUrl: './rpe.page.html',
  styleUrls: ['./rpe.page.scss'],
})
export class RpePage implements OnInit {
  e1rm = '';
  eLoad = '';

  scale: RPEPct = RPEPCTTABLE;

  constructor() { }

  ngOnInit() {
  }

  calcMax(weight: number, reps: number, rpe: number): number | null {
    // @ts-ignore
    if (reps in this.scale && rpe in this.scale[reps]) {
      // @ts-ignore - already made sure reps and RPE were in the scale
      const percent = this.scale[reps][rpe];
      return (weight / percent) * 100;
    }
    return null;
  }

  calcLoad(max: number, reps: number, rpe: number): number | null {
    // @ts-ignore
    if (reps in this.scale && rpe in this.scale[reps]) {
      // @ts-ignore - already made sure reps and RPE were in the scale
      const percent = this.scale[reps][rpe];
      return (max * percent) / 100;
    }
    return null;
  }

  onCalcERM(form: NgForm): void {
    if (
      form.value.haveWeight &&
      form.value.haveReps &&
      form.value.haveRPE
    ) {
      if (
        form.value.haveReps >= 1 &&
        form.value.haveReps <= 15 &&
        form.value.haveRPE <= 10 &&
        ((form.value.haveReps <= 10 && form.value.haveRPE >= 5) ||
          (form.value.haveReps === 11 && form.value.haveRPE >= 6) ||
          (form.value.haveReps === 12 && form.value.haveRPE >= 7) ||
          (form.value.haveReps === 13 && form.value.haveRPE >= 8) ||
          (form.value.haveReps === 14 && form.value.haveRPE >= 9) ||
          (form.value.haveReps === 15 && form.value.haveRPE === 10))
      ) {
        const e1rm = this.calcMax(
          form.value.haveWeight,
          form.value.haveReps,
          form.value.haveRPE
        );
        if (e1rm) {
          this.e1rm = e1rm.toFixed(2) + 'kg';
        } else {
          this.e1rm = 'invalid';
        }
      } else {
        this.e1rm = 'invalid';
      }
    } else {
      this.e1rm = '';
    }
  }

  onCalcELOAD(form: NgForm): void {
    if (
      this.e1rm &&
      form.value.wantReps &&
      form.value.wantRPE
    ) {
      if (
        form.value.wantReps >= 1 &&
        form.value.wantReps <= 15 &&
        form.value.wantRPE <= 10 &&
        ((form.value.wantReps <= 10 && form.value.wantRPE >= 5) ||
          (form.value.wantReps === 11 && form.value.wantRPE >= 6) ||
          (form.value.wantReps === 12 && form.value.wantRPE >= 7) ||
          (form.value.wantReps === 13 && form.value.wantRPE >= 8) ||
          (form.value.wantReps === 14 && form.value.wantRPE >= 9) ||
          (form.value.wantReps === 15 && form.value.wantRPE === 10))
      ) {
        const eLoad = this.calcLoad(
          +this.e1rm.slice(0, -2),
          form.value.wantReps,
          form.value.wantRPE
        );
        if (eLoad) {
          this.eLoad = eLoad.toFixed(2) + 'kg';
        } else {
          this.eLoad = 'invalid';
        }
      } else {
        this.eLoad = 'invalid';
      }
    } else {
      this.eLoad = '';
    }
  }
}
