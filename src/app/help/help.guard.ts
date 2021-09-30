import { Injectable } from '@angular/core';
import { CanLoad, Router } from '@angular/router';
import { HelpService } from './help.service';

@Injectable({
  providedIn: 'root'
})
export class HelpGuard implements CanLoad {

  constructor(
    private router: Router,
    private helpService: HelpService
  ) { }

  async canLoad(): Promise<boolean> {
    return this.helpService.checkWelcomed().then(() => {
      if (this.helpService.haveWelcomed) {
        this.router.navigateByUrl('app/tabs/rpe');
        return false;
      } else {
        return true;
      }
    });
  }
}
