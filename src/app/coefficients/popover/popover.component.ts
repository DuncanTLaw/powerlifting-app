import { Component, OnInit } from '@angular/core';
import { CoeffService } from '../coefficients.service';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
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
