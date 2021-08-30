import { Component, OnInit } from '@angular/core';
import { WeightUnitService } from '../settings/weight-unit.service';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  constructor(
    public weightUnitService: WeightUnitService,
    private menuController: MenuController
  ) { }

  ngOnInit() {
  }

  onClickButton = (): Promise<boolean> => this.menuController.close();

}
