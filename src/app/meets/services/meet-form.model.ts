import { FormControl, Validators } from '@angular/forms';

export class MeetFormGroupTemplate {
  static get template() {
    return {
      name: new FormControl('', Validators.required),
      fed: new FormControl(''),
      wc: new FormControl(''),
      bp: new FormControl(false),
      date: new FormControl('', Validators.required),
      weighIn: new FormControl(''),
      location: new FormControl(''),
      notes: new FormControl('')
    };
  }
}
