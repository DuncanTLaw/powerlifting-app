import { Component, OnInit } from '@angular/core';

import { LoaderService } from './loader.service';

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
  plateCount: {[plateWeight: string]: number} = {
    '50kg': 0,
    '25kg': 8,
    '20kg': 1,
    '15kg': 1,
    '10kg': 1,
    '5kg': 1,
    '2.5kg': 1,
    '1.25kg': 1
  };

  constructor(private loaderService: LoaderService) { }

  ngOnInit() {
  }

  onCalcBar(): void {

  }

  asIsOrder(a: any, b: any): number {
    // This sort method is from https://github.com/angular/angular/issues/31420
    return 1;
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
