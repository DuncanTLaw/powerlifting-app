import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-meets',
  templateUrl: './meets.page.html',
  styleUrls: ['./meets.page.scss'],
})
export class MeetsPage implements OnInit {
  hasMeets: boolean;
  addMeet = false;
  newMeet = new FormGroup({
    name: new FormControl('', Validators.required),
    fed: new FormControl(''),
    wc: new FormControl(''),
    bp: new FormControl(false),
    date: new FormControl('', Validators.required),
    location: new FormControl(''),
    goal: new FormControl(''),
    notes: new FormControl('')
  });
  today: string;

  constructor() { }

  ngOnInit() {
    this.getDateString();
  }

  onClickAddMeet(): void {
    this.addMeet = !this.addMeet;
  }

  onSubmit(): void {
    this.addMeet = false;
    console.log(this.newMeet);
  }

  getDateString(): void {
    const date = new Date();
    this.today = date.toISOString().split('T')[0];
  }
}
