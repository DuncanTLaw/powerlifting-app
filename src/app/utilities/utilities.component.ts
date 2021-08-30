import { Component, OnInit } from '@angular/core';
import { WeightUnitService } from '../settings/weight-unit.service';

const LB_IN_KG = 2.2046226218488;

@Component({
  selector: 'app-utilities',
  templateUrl: './utilities.component.html',
  styleUrls: ['./utilities.component.scss'],
})
export class UtilitiesComponent implements OnInit {
  squatNum: number;
  benchNum: number;
  deadliftNum: number;
  totalNum = 0;

  conversionNum: number;
  conversionUnit: string;
  convertedNum: number;
  convertedUnit: string;

  constructor(public weightUnitService: WeightUnitService) { }

  ngOnInit() {
    if (this.weightUnitService.userUnit.value === 'lb') {
      this.conversionUnit = 'lb';
      this.convertedUnit = 'kg';
    } else {
      this.conversionUnit = 'kg';
      this.convertedUnit = 'lb';
    }
  }

  calcTotal(): void {
    const sq = (!this.squatNum) ? 0 : this.squatNum;
    const bp = (!this.benchNum) ? 0 : this.benchNum;
    const dl = (!this.deadliftNum) ? 0 : this.deadliftNum;
    this.totalNum = sq + bp + dl;
  }

  onSwitchConversion(): void {
    if (this.conversionUnit === 'lb') {
      this.conversionUnit = 'kg';
      this.convertedUnit = 'lb';
    } else {
      this.conversionUnit = 'lb';
      this.convertedUnit = 'kg';
    }
    this.convertNumber();
  }

  convertNumber(): void {
    if (this.conversionUnit === 'lb') {
      this.convertedNum = this.conversionNum / LB_IN_KG;
    } else {
      this.convertedNum = this.conversionNum * LB_IN_KG;
    }
  }

}
