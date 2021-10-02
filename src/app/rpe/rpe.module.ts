import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RpePageRoutingModule } from './rpe-routing.module';

import { RpePage } from './rpe.page';
import { JoyrideModule } from 'ngx-joyride';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RpePageRoutingModule,
    JoyrideModule.forChild()
  ],
  declarations: [RpePage]
})
export class RpePageModule {}
