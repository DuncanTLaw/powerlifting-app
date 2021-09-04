import { Component, OnDestroy, OnInit } from '@angular/core';
import { WeightUnitService } from 'src/app/settings/weight-unit.service';
import { LoaderService, Plates } from '../loader.service';

@Component({
  selector: 'app-bar-loader',
  templateUrl: './bar-loader.component.html',
  styleUrls: ['./bar-loader.component.scss'],
})
export class BarLoaderComponent implements OnInit, OnDestroy {
  tWeight: number;
  barWeight: number;
  compCollars: boolean;
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
      { weight: 1.25, pairs: 1 },
      { weight: 1, pairs: 1 },
      { weight: 0.5, pairs: 1 },
      { weight: 0.25, pairs: 1 }
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

  ngOnInit() {
    this.weightUnitService.userUnit.subscribe(unit => {
      this.barWeight = (unit === 'kg') ? 20 : 45;
      this.compCollars = (unit === 'kg') ? true : false;
      this.onCalcBar();
    });
    this.loaderService.checkCollars().then(collarCheck => this.compCollars = collarCheck);
  }

  ngOnDestroy() {
    this.weightUnitService.userUnit.unsubscribe();
  }


  onCalcBar(): void {
    const unitUsed = this.weightUnitService.userUnit.value;

    if (unitUsed === 'kg') {
      if (
        (this.compCollars && (this.tWeight > (this.barWeight + this.collarsWeight))) ||
        (!this.compCollars && (this.tWeight > this.barWeight))
      ) {
        this.barLoaded = this.loaderService.weightToBarLoad(
          this.tWeight, this.plateCount[unitUsed], this.barWeight, this.compCollars
        );
      } else {
        this.barLoaded = null;
      }
    } else if (unitUsed === 'lb') {
      if (this.tWeight > this.barWeight) {
        this.barLoaded = this.loaderService.weightToBarLoad(
          this.tWeight, this.plateCount[unitUsed], this.barWeight, false
        );
      } else {
        this.barLoaded = null;
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
    this.loaderService.setCollars(this.compCollars);
  }

  onExpandPlates(): void {
    this.showPlates = !this.showPlates;
    this.plateText = (this.showPlates) ? 'Hide plate configuration' : 'Configure available plates';
  }
}
