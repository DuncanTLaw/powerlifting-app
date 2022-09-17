import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { LoaderService, Plate } from '../loader.service';

@Component({
  selector: 'app-bar-loaded',
  templateUrl: './bar-loaded.component.html',
  styleUrls: ['./bar-loaded.component.scss'],
})
export class BarLoadedComponent implements OnInit {
  plateCount: Array<Plate> = [
    { weight: 25, count: null },
    { weight: 20, count: null },
    { weight: 15, count: null },
    { weight: 10, count: null },
    { weight: 5, count: null },
    { weight: 2.5, count: null },
    { weight: 1.25, count: null }
  ];
  barLoaded = 25;

  constructor(
    public loaderService: LoaderService,
    private menuController: MenuController
  ) { }

  ngOnInit() {}

  onCountPlates(): void {
    const filteredPlates = this.loaderService.filterPlates(this.plateCount);
    const collarWeight = 2.5;
    let plateWeight = 0;
    for(const plate of filteredPlates) {
      plateWeight += plate.weight*plate.count;
    }
    this.barLoaded = 20 + 2*(collarWeight + plateWeight);
  }

  openMenu(): void {
    this.menuController.open();
  }
}
