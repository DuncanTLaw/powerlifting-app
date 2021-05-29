import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.page.html',
  styleUrls: ['./timer.page.scss'],
})
export class TimerPage implements OnInit {
  timerRunning = false;
  timerInstance: any;
  buttonText = 'Start';
  minutes: any = '00';
  seconds: any = '00';
  counter = 0;

  constructor() { }

  ngOnInit() {
  }

  onToggleTimer() {
    this.timerRunning = !this.timerRunning;
    if (this.timerRunning) {
      this.buttonText = 'Stop';
      const startTime = Date.now() - this.counter;
      this.timerInstance = setInterval(() => {
        this.counter = Date.now() - startTime;
        this.minutes = Math.floor(this.counter / 60000);
        this.seconds = Math.floor(Math.floor(this.counter % 60000) / 1000).toFixed(0);
        if (+this.minutes < 10) {
          this.minutes = '0' + this.minutes;
        }
        if (+this.seconds < 10) {
          this.seconds = '0' + this.seconds;
        }
      });
    } else {
      this.buttonText = 'Resume';
      clearInterval(this.timerInstance);
    }
  }

  onClearTimer() {
    this.timerRunning = false;
    this.buttonText = 'Start';
    this.counter = 0;
    this.seconds = this.minutes = '00';
    clearInterval(this.timerInstance);
  }

}
