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
  plateCount: Array<Plates> = [
    { weight: 50, pairs: 0 },
    { weight: 25, pairs: 8 },
    { weight: 20, pairs: 1 },
    { weight: 15, pairs: 1 },
    { weight: 10, pairs: 1 },
    { weight: 5, pairs: 1 },
    { weight: 2.5, pairs: 1 },
    { weight: 1.25, pairs: 1 }
  ];
  barLoaded: any[];

  constructor(
    public weightUnitService: WeightUnitService,
    public loaderService: LoaderService
  ) { }

  ngOnInit() {}

  onCalcBar(): void {
    if (
      (this.compCollars && (this.weightUnitService.convertToKilo(this.tWeight) > (this.barWeight + this.collarsWeight))) ||
      (!this.compCollars && (this.weightUnitService.convertToKilo(this.tWeight) > this.barWeight + this.collarsWeight))
    ) {
      this.barLoaded = this.loaderService.weightToBarLoad(
        this.weightUnitService.convertToKilo(this.tWeight), this.plateCount, this.barWeight, this.compCollars
      );
    } else {
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
