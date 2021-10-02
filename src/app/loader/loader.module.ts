import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoaderPageRoutingModule } from './loader-routing.module';

import { LoaderPage } from './loader.page';
import { BarLoadedComponent } from './bar-loaded/bar-loaded.component';
import { BarLoaderComponent } from './bar-loader/bar-loader.component';
import { JoyrideModule } from 'ngx-joyride';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoaderPageRoutingModule,
    JoyrideModule.forChild()
  ],
  declarations: [LoaderPage, BarLoadedComponent, BarLoaderComponent]
})
export class LoaderPageModule {}
