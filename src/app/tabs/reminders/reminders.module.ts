import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RemindersPageRoutingModule } from './reminders-routing.module';

import { RemindersPage } from './reminders.page';
import { ReminderService } from 'src/app/services/ReminderService.service';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    ComponentsModule,
    CommonModule,
    FormsModule,
    IonicModule,
    RemindersPageRoutingModule
  ],
  providers:[
    ReminderService
  ],
  declarations: [RemindersPage]
})
export class RemindersPageModule {}
