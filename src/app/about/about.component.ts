import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  constructor(
    private menuController: MenuController
  ) { }

  ngOnInit() {
  }

  onClickButton(): void {
    this.menuController.close();
  }

}
