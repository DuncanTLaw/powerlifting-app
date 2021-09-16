import { Component, OnInit } from '@angular/core';

interface PAGES {
  [pageName: string]: {
    label: string;
    icon: string;
    color: string;
  };
}

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {
  pages: PAGES = {
    rpe: {
      label: 'RPE',
      icon: 'stats-chart',
      color: 'var(--ion-color-tertiary)'
    },
    coeff: {
      label: 'Coefficients',
      icon: 'calculator',
      color: 'var(--ion-color-warning)'
    },
    timer: {
      label: 'Timer',
      icon: 'timer-sharp',
      color: 'var(--ion-color-danger)'
    },
    loader: {
      label: 'Loader',
      icon: 'barbell-sharp',
      color: 'var(--ion-color-success)'
    },
  };

  constructor() { }

  ngOnInit() {
  }

  returnZero(): number {
    return 0;
  }
}
