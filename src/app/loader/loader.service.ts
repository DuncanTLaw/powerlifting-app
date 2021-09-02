import { Injectable } from '@angular/core';
import { WeightUnitService } from '../settings/weight-unit.service';

export interface Plates {
  weight: number; pairs: number;
};

export interface Plate {
  weight: number; count: number;
};

interface FunctionHandler {
  [unit: string]: {
    heights(plate: number): number;
    colours(plate: number): string;
  };
}

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  handleUnits: FunctionHandler = {
    kg: {
      heights: (plate: number): number => this.kgHeights(plate),
      colours: (plate: number): string => this.getKGBadgeColor(plate)
    },
    lb: {
      heights: (plate: number): number => this.lbHeights(plate),
      colours: (plate: number): string => 'medium'
    },
  };

  constructor(private weightUnitService: WeightUnitService){}

  getHeight(plate: number): string {
    const heights = (this.weightUnitService.userUnit.value === 'kg') ?
    this.handleUnits.kg.heights(plate) : this.handleUnits.lb.heights(plate);
    return `${heights}px`;
  };

  getKGBadgeColor(plate: number): string {
    switch (plate) {
      case 25:
        return 'danger';
      case 20:
        return 'primary';
      case 15:
        return 'warning';
      case 10:
        return 'success';
      case 5:
        return 'light';
      case 2.5:
        return 'dark';
      case 1.25:
        return 'medium';
      case 1:
        return 'medium';
      case 0.5:
        return 'medium';
      case 0.25:
        return 'medium';
      default:
        return 'dark';
    }
  }

  displayWeight(weight: number): string {
    return weight.toFixed(2).replace('.00', '');
  };

  filterPlates(plates: Array<Plate>): Array<Plate> {
    return plates.filter(plate => plate.count > 0);
  }

  weightToBarLoad = (weight: number, plates: any, barWeight: number, compCollar: boolean) => {
    const filteredPairs = this.filterPair(plates);

    // The plates that will go on one side of the bar
    const barLoad = [];
    const collarWeight = (compCollar) ? 2.5 : 0;

    const barAndCollarWeight = Number(
      this.displayWeight(barWeight + collarWeight * 2)
    );

    // Amount of weight to go on one side of the bar
    let sideWeight = (weight - barAndCollarWeight) / 2;

    for (const i in filteredPairs) {
      if (i) {
        const plate = filteredPairs[i];
        let pairsAvailable = plate.pairs;
        while (plate.weight <= sideWeight && pairsAvailable > 0) {
          barLoad.push(plate.weight);
          sideWeight -= plate.weight;
          pairsAvailable--;
        }
      }
    }

    if (sideWeight > 0) {
      barLoad.push(sideWeight.toFixed(3));
    }

    return barLoad;
  };

  // from https://ionicframework.com/docs/angular/performance
  trackItems(index: number, itemObject: any) {
    return itemObject.id;
  }

  private kgHeights(plate: number): number {
    const maxHeight = 80;

    let height: number;
    switch (plate) {
      case 25:
        height = maxHeight;
        break;
      case 20:
        height = maxHeight;
        break;
      case 15:
        height = maxHeight * 0.9;
        break;
      case 10:
        height = maxHeight * 0.8;
        break;
      case 5:
        height = maxHeight * 0.6;
        break;
      case 2.5:
        height = maxHeight * 0.5;
        break;
      case 1.25:
        height = maxHeight * 0.4;
        break;
      case 1:
        height = maxHeight * 0.3;
        break;
      case 0.5:
        height = maxHeight * 0.2;
        break;
      case 0.25:
        height = maxHeight * 0.1;
        break;
      default:
        height = 3;
    }
    return height;
  };

  private lbHeights(plate: number): number {
    const maxHeight = 80;

    let height: number;
    switch (plate) {
      case 45:
        height = maxHeight;
        break;
      case 25:
        height = maxHeight * 0.9;
        break;
      case 10:
        height = maxHeight * 0.8;
        break;
      case 5:
        height = maxHeight * 0.7;
        break;
      case 2.5:
        height = maxHeight * 0.6;
        break;
      case 1.25:
        height = maxHeight * 0.5;
        break;
      case 1:
        height = maxHeight * 0.4;
        break;
      case 0.5:
        height = maxHeight * 0.3;
        break;
      case 0.25:
        height = maxHeight * 0.2;
        break;
      default:
        height = 3;
    }
    return height;
  };

  private filterPair(plates: Array<Plates>): Array<Plates> {
    return plates.filter(plate => plate.pairs > 0);
  }
}
