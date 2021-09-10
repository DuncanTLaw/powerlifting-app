import { Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { Router } from '@angular/router';

interface PAGES {
  [pageName: string]: {
    label: string;
    icon: string;
    colour: string;
  };
}

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit{
  pages: PAGES = {
    rpe: {
      label: 'RPE',
      icon: 'stats-chart',
      colour: 'var(--ion-color-tertiary)'
    },
    coeff: {
      label: 'Coefficients',
      icon: 'calculator',
      colour: 'var(--ion-color-warning)'
    },
    timer: {
      label: 'Timer',
      icon: 'timer-sharp',
      colour: 'var(--ion-color-danger)'
    },
    loader: {
      label: 'Loader',
      icon: 'barbell-sharp',
      colour: 'var(--ion-color-success)'
    },
  };

  constructor(private metaService: Meta, public router: Router) {}

  ngOnInit() {
    this.metaService.addTags([
      {
        name: 'keywords', content:
        // eslint-disable-next-line max-len
        'powerlifting, powerlifting toolbox, PL toolbox, RPE, rate of perceived exertion, IPF points, GL points, Wilks, Dots points, bar loader, IPF, USAPL, GBPF, gym'
      },
      {
        name: 'description', content:
        'Powerlifting toolbox which includes RPE claculator, points calculations, timer, sets counter and what plates to load.'
      }
    ]);
  }

  returnZero(): number {
    return 0;
  }
}
