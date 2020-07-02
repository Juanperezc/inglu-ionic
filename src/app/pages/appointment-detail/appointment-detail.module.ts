import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { AppointmentDetailPageRoutingModule } from "./appointment-detail-routing.module";

import { AppointmentDetailPage } from "./appointment-detail.page";
import { AppointmentService } from "src/app/services/AppointmentService.service";
import { ReportComponent } from "src/app/components/report/report.component";
import { SuggestionComponent } from "src/app/components/suggestion/suggestion.component";
import { ComponentsModule } from 'src/app/components/components.module';
import { RatingModule } from 'ng-starrating';
import { ReScheduleComponent } from 'src/app/components/re-schedule/re-schedule.component';

@NgModule({
  imports: [
    CommonModule,
    RatingModule,
    ComponentsModule,
    FormsModule,
    IonicModule,
    AppointmentDetailPageRoutingModule,
  ],
  entryComponents: [
    ReportComponent,
    SuggestionComponent,
    ReScheduleComponent],
  declarations: [AppointmentDetailPage],
  providers: [AppointmentService],
})
export class AppointmentDetailPageModule {}
