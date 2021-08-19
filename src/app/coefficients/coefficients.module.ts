import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CoefficientsPageRoutingModule } from './coefficients-routing.module';

import { CoefficientsPage } from './coefficients.page';
import { AboutComponent } from '../about/about.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CoefficientsPageRoutingModule
  ],
  declarations: [CoefficientsPage, AboutComponent]
})
export class CoefficientsPageModule {}
