import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.page.html',
  styleUrls: ['./loader.page.scss'],
})
export class LoaderPage implements OnInit {

  constructor(private menu: MenuController) {}

  ngOnInit() {
  }

  openMenu(): void {
    this.menu.open('about');
  }
}
