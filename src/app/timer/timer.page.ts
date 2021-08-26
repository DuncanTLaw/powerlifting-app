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
  userInput = false;
  timeSelected: number;
  timeRemaining = 0;
  timeEnded = false;
  interval: any;
  lhsButtonText = 'Cancel';
  rhsButtonText = 'Start';
  allowAwake = true;

  setsSelected: number;
  setsCompleted = 0;

  constructor(
    public toastController: ToastController,
    private pickerController: PickerController
  ) { }

  ngOnInit() {
  }

  onTimerChange(event: Event) {
    const target = event.target as HTMLInputElement;
    if(+target.value > 0){
      this.userInput = true;
      this.timeRemaining = +target.value;
    } else {
      this.userInput = false;
      this.timeRemaining = 0;
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
    this.onToggleAwake();
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
    const sets = [...Array(50).keys()].map(x => ++x);
    const setsOptions: Array<PickerColumnOption> = [];
    for(const set of sets) {
      setsOptions.push({text: set.toString(), value: set});
    }

    let pickerAction: string;

		const options: PickerOptions = {
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
			],
			columns: [
				{
					name: 'sets',
					options: setsOptions
				},
			],
		};

		const picker = await this.pickerController.create(options);
    picker.keyboardClose = true;
		picker.present();
		picker.onDidDismiss().then(async () => {
      if (pickerAction === 'done') {
        const col = await picker.getColumn('sets');
        this.setsSelected = col.options[col.selectedIndex].value;
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
