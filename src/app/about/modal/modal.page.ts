import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

export interface Pages {
  title: string;
  overview: string;
  help: string;
  icon: string;
}

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {
  pages: Array<Pages> = [
    {
      title: 'RPE',
      overview: 'Calculates E1RM and weight for prescribed RPE.',
      help: '',
      icon: '',
    },
    {
      title: 'Coefficients',
      overview: 'Calculates scores from popular coefficients.',
      help: '',
      icon: '',
    },
    {
      title: 'Timer',
      overview: 'Set a timer, and tally your reps.',
      help: '',
      icon: '',
    },
    {
      title: 'Loader',
      overview: 'Figure out what plates.',
      help: '',
      icon: '',
    }
  ];

  constructor(private modalController: ModalController) { }

  ngOnInit() {
  }

  dismissModal(): void {
    this.modalController.dismiss();
  }
}
