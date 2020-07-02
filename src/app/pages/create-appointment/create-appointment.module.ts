import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateAppointmentPageRoutingModule } from './create-appointment-routing.module';

import { CreateAppointmentPage } from './create-appointment.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    CreateAppointmentPageRoutingModule
  ],
  declarations: [CreateAppointmentPage]
})
export class CreateAppointmentPageModule {}
