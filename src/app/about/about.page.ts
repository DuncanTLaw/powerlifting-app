import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {
  expandDev = false;

  constructor() { }

  ngOnInit() {
  }

  onExpandDev(): void {
    this.expandDev = !this.expandDev;
  }

}
