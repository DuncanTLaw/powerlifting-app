import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  selectedView = 'RPE Calculation';

  constructor() {}

  onChangeView(title: string): void {
    this.selectedView = title;
  }
}
