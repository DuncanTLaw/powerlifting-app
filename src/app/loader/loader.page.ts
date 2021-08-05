import { Component, OnInit } from '@angular/core';

import { LoaderService, Plates } from './loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.page.html',
  styleUrls: ['./loader.page.scss'],
})
export class LoaderPage implements OnInit {
  tWeight: number;
  compCollars = true;
  barWeight = 20;

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

  constructor(private loaderService: LoaderService) { }

  ngOnInit() {
  }

  onCalcBar(): void {
    this.barLoaded = this.loaderService.weightToBarLoad(
      this.tWeight, this.plateCount, this.barWeight, this.compCollars
    );
  }

  onExpandAdvanced(): void {
    this.showAdvanced = !this.showAdvanced;
    this.advText = (this.showAdvanced) ? 'Hide' : 'Show';
  }

  collarSegmentChanged(event: any): void {
    this.compCollars = event.target.value;
  }

  roundSegmentChanged(event: any): void {
    this.roundDown = event.target.value;
  }

  onExpandPlates(): void {
    this.showPlates = !this.showPlates;
    this.plateText = (this.showPlates) ? 'Hide plate configuration' : 'Configure available plates';
  }

}
