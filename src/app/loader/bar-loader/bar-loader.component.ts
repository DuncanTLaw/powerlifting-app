import { Component, OnInit } from '@angular/core';
import { WeightUnitService } from 'src/app/settings/weight-unit.service';
import { LoaderService, Plates } from '../loader.service';

@Component({
  selector: 'app-bar-loader',
  templateUrl: './bar-loader.component.html',
  styleUrls: ['./bar-loader.component.scss'],
})
export class BarLoaderComponent implements OnInit {
  tWeight: number;
  compCollars = true;
  barWeight = 20;
  collarsWeight = 5;

  showAdvanced = false;
  advText = 'Show';
  roundDown = true;

  showPlates = false;
  plateText = 'Configure available plates';
  plateCount: {[unit: string]: Array<Plates>} = {
    kg: [
      { weight: 50, pairs: 0 },
      { weight: 25, pairs: 8 },
      { weight: 20, pairs: 1 },
      { weight: 15, pairs: 1 },
      { weight: 10, pairs: 1 },
      { weight: 5, pairs: 1 },
      { weight: 2.5, pairs: 1 },
      { weight: 1.25, pairs: 1 }
    ],
    lb: [
      { weight: 45, pairs: 8 },
      { weight: 35, pairs: 0 },
      { weight: 25, pairs: 1 },
      { weight: 10, pairs: 1 },
      { weight: 5, pairs: 1 },
      { weight: 2.5, pairs: 1 }
    ]
  };
  barLoaded: any[];

  constructor(
    public weightUnitService: WeightUnitService,
    public loaderService: LoaderService
  ) { }

  ngOnInit() {}

  onCalcBar(): void {
    if (this.weightUnitService.userUnit === 'kg') {
      if (
        (this.compCollars && (this.tWeight > (this.barWeight + this.collarsWeight))) ||
        (!this.compCollars && (this.tWeight > this.barWeight + this.collarsWeight))
      ) {
        this.barLoaded = this.loaderService.weightToBarLoad(
          this.tWeight, this.plateCount[this.weightUnitService.userUnit], this.barWeight, this.compCollars
        );
      }
    } else if (this.weightUnitService.userUnit === 'lb') {
      if (this.tWeight > this.barWeight) {
        this.barLoaded = this.loaderService.weightToBarLoad(
          this.tWeight, this.plateCount[this.weightUnitService.userUnit], 45, false
        );
      }
    }
    else {
      this.barLoaded = null;
    }
  }

  onExpandAdvanced(): void {
    this.showAdvanced = !this.showAdvanced;
    this.advText = (this.showAdvanced) ? 'Hide' : 'Show';
  }

  collarSegmentChanged(event: any): void {
    this.compCollars = (event.target.value === 'false') ? false : true;
  }

  onExpandPlates(): void {
    this.showPlates = !this.showPlates;
    this.plateText = (this.showPlates) ? 'Hide plate configuration' : 'Configure available plates';
  }

}
