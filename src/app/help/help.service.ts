import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HelpService {
  currentRoute = new BehaviorSubject<string>('');

  constructor() { }
}
