import { Component, OnDestroy, OnInit } from '@angular/core';
import { Clipboard } from '@capacitor/clipboard';
import { ToastController } from '@ionic/angular';
import { WeightUnitService } from '../settings/settings-storage/weight-unit.service';

const LB_IN_KG = 2.2046226218488;

@Component({
  selector: 'app-utilities',
  templateUrl: './utilities.component.html',
  styleUrls: ['./utilities.component.scss'],
})
export class UtilitiesComponent implements OnInit, OnDestroy {
  squatNum: number;
  benchNum: number;
  deadliftNum: number;
  totalNum: number;

  numInput: number;
  pctInput: number;
  pctRes: number;

  conversionNum: number;
  conversionUnit: string;
  convertedNum: number;
  convertedUnit: string;

  constructor(
    public weightUnitService: WeightUnitService,
    private toastController: ToastController
  ) { }

  ngOnInit() {
    this.weightUnitService.userUnit.subscribe(unit => {
      if (unit === 'kg') {
        this.conversionUnit = 'kg';
        this.convertedUnit = 'lb';
      } else {
        this.conversionUnit = 'lb';
        this.convertedUnit = 'kg';
      }
    });
  }

  ngOnDestroy() {
    this.weightUnitService.userUnit.unsubscribe();
  }

  calcTotal(): void {
    const sq = (!this.squatNum) ? 0 : this.squatNum;
    const bp = (!this.benchNum) ? 0 : this.benchNum;
    const dl = (!this.deadliftNum) ? 0 : this.deadliftNum;
    this.totalNum = +(sq + bp + dl).toFixed(2);
  }

  calcPct(): void {
    this.pctRes = this.numInput * (this.pctInput / 100);
  }

  writeToClipboard = async (result: number): Promise<void> => {
    await Clipboard.write({
    // eslint-disable-next-line id-blacklist
      string: result.toString()
    });
    this.presentToast();
  };

  async presentToast(): Promise<void> {
    const toast = await this.toastController.create({
      message: `Calculated number copied to clipboard.`,
      cssClass: 'copy-toast-class',
      duration: 2000,
      color: 'dark'
    });
    await toast.present();
  }

  onSwitchConversion(): void {
    if (this.conversionUnit === 'lb') {
      this.conversionUnit = 'kg';
      this.convertedUnit = 'lb';
    } else {
      this.conversionUnit = 'lb';
      this.convertedUnit = 'kg';
    }
    this.convertNumber();
  }

  convertNumber(): void {
    if (this.conversionUnit === 'lb') {
      this.convertedNum = this.conversionNum / LB_IN_KG;
    } else {
      this.convertedNum = this.conversionNum * LB_IN_KG;
    }
  }
}
