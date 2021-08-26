import { Component, OnInit } from '@angular/core';
import { ToastController, PickerController } from '@ionic/angular';
import { PickerOptions, PickerColumnOption } from '@ionic/core';
import { KeepAwake } from '@capacitor-community/keep-awake';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.page.html',
  styleUrls: ['./timer.page.scss'],
})
export class TimerPage implements OnInit {
  timerRunning = false;
  secondsSelected: number;
  timeSelected: string;
  timeRemaining = 0;
  timeEnded = false;
  interval: any;
  lhsButtonText = 'Cancel';
  rhsButtonText = 'Start';
  allowAwake = false;

  setsSelected: number;
  setsCompleted = 0;

  constructor(
    public toastController: ToastController,
    private pickerController: PickerController
  ) { }

  ngOnInit() {
  }

  async showTimePicker() {
    const seconds = [...Array(60).keys()];
    const minutes = [...Array(16).keys()]; // you shouldn't even rest more than 10 mins
    const secondsOptions: Array<PickerColumnOption> = [];
    const minutesOptions: Array<PickerColumnOption> = [];
    for(const second of seconds) {
      secondsOptions.push({text: second.toString(), value: second});
    }
    for(const minute of minutes) {
      minutesOptions.push({text: minute.toString(), value: minute});
    }

    let pickerAction: string;

		const options: PickerOptions = {
			columns: [
        {
					name: 'minutes',
					options: minutesOptions
        },
        {
          name: ':',
          options: [{text: ':'}]
        },
        {
					name: 'seconds',
					options: secondsOptions
				},
			],
      buttons: [
				{
					text: 'Cancel',
          handler: () => {
            pickerAction = 'cancel';
          }
				},
				{
					text: 'Done',
          handler: () => {
            pickerAction = 'done';
          }
				},
			]
		};

		const picker = await this.pickerController.create(options);
		picker.present();
		picker.onDidDismiss().then(async () => {
      if (pickerAction === 'done') {
        const second = await picker.getColumn('seconds');
        const minute = await picker.getColumn('minutes');
        const secondVal = second.options[second.selectedIndex].value;
        const minuteVal = minute.options[minute.selectedIndex].value;
        this.timeSelected = `${minuteVal}min ${secondVal}sec`;
        this.secondsSelected = minuteVal * 60 + secondVal;
        this.timeRemaining = this.secondsSelected;
      }
		});
	}

  onClickLHS(): void {
    clearInterval(this.interval);
    this.timerRunning = false;
    this.rhsButtonText = 'Start';
    this.timeRemaining = this.secondsSelected;
  }

  onClickRHS(): void {
    this.timerRunning = !this.timerRunning;
    this.onToggleAwake();
    if(this.timeEnded) {
      this.timeRemaining = this.secondsSelected;
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
          // setTimeout(() => this.presentTimerToast(), this.timeRemaining*1000);
        }
      }, 1000);
    } else {
      this.rhsButtonText = 'Resume';
      clearInterval(this.interval);
    }
  }

  async keepAwake() {
    await KeepAwake.keepAwake();
  };

  async allowSleep() {
    await KeepAwake.allowSleep();
  }

  onToggleAwake(): void {
    if(this.allowAwake && this.timerRunning ) {
      this.keepAwake();
    } else {
      this.allowSleep();
    }
  }

  async showSetsPicker() {
    const sets = [...Array(25).keys()].map(x => ++x); // who does more than 7 sets tbh
    const setsOptions: Array<PickerColumnOption> = [];
    for(const set of sets) {
      setsOptions.push({text: set.toString(), value: set});
    }

    let pickerAction: string;

		const options: PickerOptions = {
			columns: [
				{
					name: 'sets',
					options: setsOptions
				},
			],
      buttons: [
				{
					text: 'Cancel',
          handler: () => {
            pickerAction = 'cancel';
          }
				},
				{
					text: 'Done',
          handler: () => {
            pickerAction = 'done';
          }
				},
			]
		};

		const picker = await this.pickerController.create(options);
		picker.present();
		picker.onDidDismiss().then(async () => {
      if (pickerAction === 'done') {
        const col = await picker.getColumn('sets');
        this.setsSelected = col.options[col.selectedIndex].value;
        this.setsCompleted = (this.setsSelected) ? 0 : null;
      }
		});
	}

  onSetsChange(): void {
    this.setsCompleted = 0;
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
    if (this.setsCompleted === this.setsSelected) {
      this.presentSetsToast();
    }
  }

  async presentSetsToast() {
    const toast = await this.toastController.create({
      message: `All sets completed.`,
      cssClass: 'toast-class',
      duration: 3000,
      color: 'dark'
    });
    await toast.present();
  }
}
