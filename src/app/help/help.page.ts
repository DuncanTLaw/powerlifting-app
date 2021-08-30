import { Component, OnInit } from '@angular/core';
import { HelpService } from './help.service';

interface Pages {
  title: string;
  overview: string;
  help: string[];
  icon: string;
}

@Component({
  selector: 'app-help',
  templateUrl: './help.page.html',
  styleUrls: ['./help.page.scss'],
})
export class HelpPage implements OnInit {
  pages: Array<Pages> = [
    {
      title: 'RPE',
      overview: 'Calculate E1RM and weight for prescribed RPE.',
      help: [
        'The first card takes in inputs for load and reps and RPE to give an estimated one rep max.',
        'The second card calculates the weight based on the previous E1RM from a prescribed rep and RPE.'
      ],
      icon: 'stats-chart',
    },
    {
      title: 'Coefficients',
      overview: 'Calculate scores from popular coefficients.',
      help: [
        'Input your gender and total/SBD split/bench-only total for the scores of popular coefficients.'
      ],
      icon: 'calculator',
    },
    {
      title: 'Timer',
      overview: 'Set a timer, and tally your reps.',
      help: [
        'The first card is a timer that can take in a time limit in seconds.',
        'The second card tallies up your reps - put in how many reps you are prescribed and keep track of how many you\'ve done.'
      ],
      icon: 'timer',
    },
    {
      title: 'Loader',
      overview: 'Figure out the number of plates required.',
      help: [
        'This page has two slides.',
        'The first slide takes in a required weight and displays the plate layout;',
        'toggle the weight of the bar, the collars and the number of availble plates.',
        'The second slide can tell you how much weight there is on a bar in competition.'
      ],
      icon: 'barbell-sharp',
    }
  ];

  constructor(public helpService: HelpService) { }

  ngOnInit() {
  }

}
