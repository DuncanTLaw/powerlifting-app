import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CoefficientsPageRoutingModule } from './coefficients-routing.module';

import { CoefficientsPage } from './coefficients.page';
import { JoyrideModule } from 'ngx-joyride';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CoefficientsPageRoutingModule,
    JoyrideModule.forChild()
  ],
  declarations: [CoefficientsPage]
})
export class CoefficientsPageModule {}
