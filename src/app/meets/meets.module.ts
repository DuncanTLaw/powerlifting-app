import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MeetsPageRoutingModule } from './meets-routing.module';

import { MeetsPage } from './meets.page';
import { MeetEditComponent } from './meet-edit/meet-edit.component';
import { JoyrideModule } from 'ngx-joyride';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    MeetsPageRoutingModule,
    JoyrideModule.forChild()
  ],
  declarations: [MeetsPage, MeetEditComponent]
})
export class MeetsPageModule {}
