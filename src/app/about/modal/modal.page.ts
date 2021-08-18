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
      overview: 'Calculate E1RM and weight for prescribed RPE.',
      help:
        'The first card takes in inputs for load and reps and RPE to give an estimated one rep max.\
        The second card calculates the weight based on the previous E1RM from a prescribed rep and RPE.',
      icon: '',
    },
    {
      title: 'Coefficients',
      overview: 'Calculate scores from popular coefficients.',
      help: 'Input your gender and total/SBD split/bench-only total for the scores of popular coefficients.',
      icon: '',
    },
    {
      title: 'Timer',
      overview: 'Set a timer, and tally your reps.',
      help: 'The first card is a timer that can take in a time limit in seconds.\
      The second card tallies up your reps - put in how many reps you are prescribed and keep track of how many you\'ve done.',
      icon: '',
    },
    {
      title: 'Loader',
      overview: 'Figure out the number of plates required.',
      help: 'This page has two slides - the first slide takes in a required weight and displays the plate layout.\
      Toggle the weight of the bar, the collars and the number of availble plates.\
      The second slide can tell you how much weight there is on a bar in competition.',
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
