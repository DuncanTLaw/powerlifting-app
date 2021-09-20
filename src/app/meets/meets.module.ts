import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MeetsPageRoutingModule } from './meets-routing.module';

import { MeetsPage } from './meets.page';
import { MeetEditComponent } from './meet-edit/meet-edit.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    MeetsPageRoutingModule
  ],
  declarations: [MeetsPage, MeetEditComponent]
})
export class MeetsPageModule {}
