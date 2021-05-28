import { Component, OnInit } from '@angular/core';

import { CoeffService } from './coefficients.service';

@Component({
  selector: 'app-coefficients',
  templateUrl: './coefficients.page.html',
  styleUrls: ['./coefficients.page.scss'],
})
export class CoefficientsPage implements OnInit {
  points = 'IPF GL';

  constructor(private coeffService: CoeffService) { }

  ngOnInit() {
  }

}
