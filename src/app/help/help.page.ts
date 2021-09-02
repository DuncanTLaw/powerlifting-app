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
        'The first card takes in inputs for load, reps and RPE to give an estimated one rep max.',
        'The second card suggests a weight based on the previous E1RM from a prescribed rep and RPE.'
      ],
      icon: 'stats-chart',
    },
    {
      title: 'Coefficients',
      overview: 'Calculate scores from popular coefficients.',
      help: [
        'Input your gender and numbers for the scores of popular coefficients, including IPF GL points, IPF points, Dots and Wilks.'
      ],
      icon: 'calculator',
    },
    {
      title: 'Timer',
      overview: 'Set a timer, and tally your reps.',
      help: [
        'The first card is a timer that can take in a time limit and will send you a notification when the time is up.',
        'The second card tallies up your reps: put in how many reps you are prescribed and keep track of how many you\'ve completed.'
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
