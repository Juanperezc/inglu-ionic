import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateAppointmentPageRoutingModule } from './create-appointment-routing.module';

import { CreateAppointmentPage } from './create-appointment.page';
import { CalendarModule } from 'angular-calendar';
import { CustomDateFormatter } from './custom-date-formatter.provider';


@NgModule({
  imports: [
    CommonModule,
    CalendarModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    CreateAppointmentPageRoutingModule
  ],
  declarations: [CreateAppointmentPage],
  providers: [
    CustomDateFormatter
  ]
})
export class CreateAppointmentPageModule {}
