import { Injectable } from '@angular/core';

export interface Plates {
  weight: number; pairs: number;
};

export interface Plate {
  weight: number; count: number;
};

export interface Count {
  [weight: number]: number;
}

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  kgHeights(plate: number): number {
    const maxHeight = 160;

    let height: number;
    switch (plate) {
      // 25 and 20 are default maxHeight
      case 15:
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
        height = maxHeight;
    }
    return height;
  };

  getHeight(plate: number): string {
    const heights = this.kgHeights;
    return `${heights(plate)}px`;
  };

  kgColours(plate: number): string {
    switch (plate) {
      case 25:
        return 'red';
      case 20:
        return 'blue';
      case 15:
        return 'yellow';
      case 10:
        return 'green';
      case 5:
        return 'white';
      case 2.5:
        return 'black';
      case 1.25:
        return 'gray';
      default:
        return 'black';
    }
  }

  textColours(plateColour: string): string {
    const darkColours = ['black', 'blue'];
    return (darkColours.includes(plateColour)) ? 'white' : 'black';
  }

  getColour(plate: number): {[colour: string]: string} {
    const plateColour = this.kgColours(plate);
    const textColour = this.textColours(plateColour);

    return {
      plateColourKey: plateColour,
      textColourKey: textColour
    };
  };

  displayWeight(weight: number): string {
    return weight.toFixed(2).replace('.00', '');
  };

  filterPlates(plates: Array<Plate>): Array<Plate> {
    return plates.filter(plate => plate.count > 0);
  }

  filterPair(plates: Array<Plates>): Array<Plates> {
    return plates.filter(plate => plate.pairs > 0);
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

  getBadgeColor(plate: number): string {
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
      default:
        return 'dark';
    }
  }
}
