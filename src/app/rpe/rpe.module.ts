import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RpePageRoutingModule } from './rpe-routing.module';

import { RpePage } from './rpe.page';
import { AboutComponent } from '../about/about.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RpePageRoutingModule
  ],
  declarations: [RpePage, AboutComponent]
})
export class RpePageModule {}
