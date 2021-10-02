import { Component, OnInit } from '@angular/core';
import { ToastController, PickerController } from '@ionic/angular';
import { PickerOptions, PickerColumnOption } from '@ionic/core';
import { KeepAwake } from '@capacitor-community/keep-awake';
import { AwakeService } from '../settings/settings-storage/awake.service';
import { LocalNotifications } from '@capacitor/local-notifications';

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
  minutesColIndex: number;
  secondsColIndex: number;

  setsSelected: number;
  setsCompleted = 0;
  setsColIndex: number;

  constructor(
    public toastController: ToastController,
    private pickerController: PickerController,
    public awakeService: AwakeService
  ) { }

  async ngOnInit() {
    await LocalNotifications.requestPermissions();
    this.awakeService.checkAwake();
  }

  async showTimePicker(): Promise<void> {
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
					options: minutesOptions,
          selectedIndex: this.minutesColIndex
        },
        {
          name: ':',
          options: [{text: ':'}]
        },
        {
					name: 'seconds',
					options: secondsOptions,
          selectedIndex: this.secondsColIndex
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
        this.secondsColIndex = second.selectedIndex;
        this.minutesColIndex = minute.selectedIndex;
      }
		});
	}

  async scheduleNotification(): Promise<void> {
    const minutes = Math.floor(this.secondsSelected / 60);
    const seconds = this.secondsSelected - minutes * 60;

    const timeString = ((minutes > 0) ? (minutes + ' minute' + ((minutes > 1) ? 's ' : ' ')) : '')
      + ((seconds > 0) ? (seconds + ' second' + ((seconds > 1) ? 's ' : ' ')) : '');

    await LocalNotifications.schedule({
      notifications: [
        {
          title: 'Timer',
          body: `${timeString}completed.`,
          id: 0,
          schedule: { at: new Date(Date.now() + this.timeRemaining * 1000) }
        }
      ]
    });
  }

  async cancelNotification(): Promise<void> {
    await LocalNotifications.cancel({ notifications: [{ id: 0 }] });
  }

  onClickLHS(): void {
    clearInterval(this.interval);
    this.timerRunning = false;
    this.rhsButtonText = 'Start';
    this.timeRemaining = this.secondsSelected;
    this.cancelNotification();
  }

  onClickRHS(): void {
    this.onToggleAwake();

    this.timerRunning = !this.timerRunning;
    if(this.timeEnded) {
      this.timeRemaining = this.secondsSelected;
    }
    if(this.timerRunning) {
      this.scheduleNotification();
      this.timeEnded = false;
      this.rhsButtonText = 'Pause';

      let prevTimestamp = Date.now();
      this.interval = setInterval(() => {
        if(this.timeRemaining > 0) {
          this.timeRemaining--;

          let timeInBackground = 0;
          const currentTimestamp = Date.now();
          const timeDelta = currentTimestamp - prevTimestamp;
          timeInBackground += Math.round(timeDelta / 1000);
          if (timeInBackground > 1) {
            this.timeRemaining = this.timeRemaining - timeInBackground;
            if (this.timeRemaining < 0) {
              this.timeRemaining = 0;
            }
          }
          prevTimestamp = currentTimestamp;
        } else {
          this.rhsButtonText = 'Start';
          this.timerRunning = false;
          this.timeEnded = true;
          clearInterval(this.interval);
        }
      }, 1000);
    } else {
      this.rhsButtonText = 'Resume';
      clearInterval(this.interval);
      this.cancelNotification();
    }
  }

  keepAwake = async (): Promise<void> => await KeepAwake.keepAwake();

  allowSleep = async (): Promise<void> => await KeepAwake.allowSleep();

  onToggleAwake(): void {
    this.awakeService.setAwake();
    if(this.awakeService.allowAwake && this.timerRunning ) {
      this.keepAwake();
    } else {
      this.allowSleep();
    }
  }

  async showSetsPicker(): Promise<void> {
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
					options: setsOptions,
          selectedIndex: this.setsColIndex
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
        this.setsColIndex = col.selectedIndex;
      }
		});
	}

  onSetsChange = (): number => this.setsCompleted = 0;

  onRemoveSet(): void {
    if (this.setsCompleted > 0 && this.setsSelected){
      this.setsCompleted--;
    }
  }

  onAddSet(): void {
    if (this.setsSelected && this.setsCompleted < this.setsSelected) {
      this.setsCompleted++;
    }
    if (this.setsCompleted === this.setsSelected) {
      this.presentSetsToast();
    }
  }

  async presentSetsToast(): Promise<void> {
    const toast = await this.toastController.create({
      message: `All sets completed.`,
      cssClass: 'toast-class',
      duration: 3000,
      color: 'dark',
      buttons: [
        {
          text: 'Done',
          role: 'cancel'
        }
      ]
    });
    await toast.present();
  }
}
