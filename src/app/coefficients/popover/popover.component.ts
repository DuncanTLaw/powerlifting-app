import { Component, OnInit } from '@angular/core';
import { CoeffService } from '../coefficients.service';

@Component({
  selector: 'app-popover',
  template: `
    <p>
      The OUPLC Blues classifications are:
    </p>
    <ul>
      <li>Full Blue: {{ fullBlue }} {{ pointSystem }}</li>
      <li>Half Blue: {{ halfBlue }} {{ pointSystem }}</li>
    </ul>
  `,
  styles: ['p { margin-left: 8px; }'],
})
export class PopoverComponent implements OnInit {
  fullBlue: number;
  halfBlue: number;
  pointSystem: string;

  constructor(private coeffService: CoeffService) {
    this.fullBlue = this.coeffService.bluesConst.full;
    this.halfBlue = this.coeffService.bluesConst.half;
    this.pointSystem = this.coeffService.bluesClass;
  }

  ngOnInit() {}

}
