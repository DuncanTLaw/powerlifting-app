import { UntypedFormControl, Validators } from '@angular/forms';

export class MeetFormGroupTemplate {
  static get template() {
    return {
      name: new UntypedFormControl('', Validators.required),
      fed: new UntypedFormControl(''),
      wc: new UntypedFormControl(''),
      bp: new UntypedFormControl(false),
      date: new UntypedFormControl('', Validators.required),
      weighIn: new UntypedFormControl(''),
      location: new UntypedFormControl(''),
      notes: new UntypedFormControl('')
    };
  }
}
