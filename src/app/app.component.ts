import { Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit{

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

}
