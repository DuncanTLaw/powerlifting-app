import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.page.html',
  styleUrls: ['./timer.page.scss'],
})
export class TimerPage implements OnInit {
  timerRunning = false;
  userInput = false;
  timeSelected: number;
  timeRemaining = 0;
  timeEnded = false;
  interval: any;
  lhsButtonText = 'Cancel';
  rhsButtonText = 'Start';

  setsSelected: number;
  setsCompleted = 0;

  constructor(public toastController: ToastController) { }

  ngOnInit() {
  }

  onInputChange(event: Event) {
    const target = event.target as HTMLInputElement;
    if(+target.value > 0){
      this.userInput = true;
      this.timeRemaining = +target.value;
    } else {
      this.userInput = false;
    }
  }

  onClickLHS(): void {
    clearInterval(this.interval);
    this.timerRunning = false;
    this.rhsButtonText = 'Start';
    this.timeRemaining = this.timeSelected;
  }

  onClickRHS(): void {
    this.timerRunning = !this.timerRunning;
    if(this.timeEnded) {
      this.timeRemaining = this.timeSelected;
    }
    if(this.timerRunning) {
      this.timeEnded = false;
      this.rhsButtonText = 'Pause';
      this.interval = setInterval(() => {
        if(this.timeRemaining > 0) {
          this.timeRemaining--;
        } else {
          this.rhsButtonText = 'Start';
          this.timerRunning = false;
          this.timeEnded = true;
          clearInterval(this.interval);
          setTimeout(() => this.presentToast(), this.timeRemaining*1000);
        }
      }, 1000);
    } else {
      this.rhsButtonText = 'Resume';
      clearInterval(this.interval);
    }
  }

  onRemoveSet(): void {
    if (this.setsCompleted > 0 && this.setsSelected){
      this.setsCompleted --;
    }
  }

  onAddSet(): void {
    if (this.setsSelected && this.setsCompleted < this.setsSelected) {
      this.setsCompleted ++;
    }
  }

  async presentToast() {
    const toast = await this.toastController.create({
      header: 'Timer',
      message: 'Completed',
      cssClass: 'custom-class',
      duration: 3000,
      buttons: [
        {
          side: 'start',
          icon: 'timer-sharp',
        }
      ],
      color: 'dark'
    });
    await toast.present();
  }
}
