import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit{
  title = 'Powerlifting Toolbox';

  constructor(private titleService: Title, private metaService: Meta) {}

  ngOnInit() {
    this.titleService.setTitle(this.title);
    this.metaService.addTags([
      {name: 'keywords', content: 'powerlifting, IPF points, GL points, Wilks, Dots points, bar loader, IPF, USAPL, GBPF'},
      {name: 'description', content:
        'Powerlifting toolbox which includes RPE claculator, points calculations, timer, sets counter and what plates to load.'
      }
    ]);
  }

}
