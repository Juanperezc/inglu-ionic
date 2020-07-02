import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReminderDetailPageRoutingModule } from './reminder-detail-routing.module';

import { ReminderDetailPage } from './reminder-detail.page';
import { ComponentsModule } from '../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
    IonicModule,
    ReminderDetailPageRoutingModule
  ],
  declarations: [ReminderDetailPage]
})
export class ReminderDetailPageModule {}
