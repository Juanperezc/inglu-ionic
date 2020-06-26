import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ExploreContainerComponentModule } from '../../explore-container/explore-container.module';
import { AppointmentsPage } from './appointments.page';
import { AppointmentService } from 'src/app/services/AppointmentService.service';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    IonicModule,
    ComponentsModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    RouterModule.forChild([{ path: '', component: AppointmentsPage }])
  ],
  declarations: [AppointmentsPage],
  providers: [
    AppointmentService
  ]
})
export class AppointmentsPageModule {}
