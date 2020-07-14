import { IonicModule } from "@ionic/angular";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NavHeaderComponent } from "./nav-header/nav-header.component";
import { FilterEventsComponent } from "./filter-events/filter-events.component";
import { ReportComponent } from "./report/report.component";
import { ClaimService } from "../services/ClaimService.service";
import { ClaimUserService } from "../services/ClaimUserService.service";
import { SuggestionService } from "../services/SuggestionService.service";
import { SuggestionUserService } from "../services/SuggestionUserService.service";
import { SuggestionComponent } from './suggestion/suggestion.component'
import { ReScheduleComponent } from './re-schedule/re-schedule.component';
import { NoDataComponent } from './no-data/no-data.component';
import { SelectSpecialtyComponent } from './select-specialty/select-specialty.component';
import { SpecialtyService } from '../services/SpecialtyService.service';
import { LogoutComponent } from './logout/logout.component'
import { AuthVerifyComponent } from './auth-verify/auth-verify.component';
import { CalendarModule } from 'angular-calendar';

@NgModule({
  imports: [
    IonicModule,
    FormsModule,
    CalendarModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
  ],
  entryComponents: [NoDataComponent,AuthVerifyComponent],
  providers: [
    ClaimService,
    ClaimUserService,
    SuggestionService,
    SuggestionUserService,
    SpecialtyService,
 
  ],

  declarations: [ReScheduleComponent,LogoutComponent, ReportComponent,SelectSpecialtyComponent,AuthVerifyComponent, NoDataComponent, NavHeaderComponent,SuggestionComponent, FilterEventsComponent],
  exports: [ReScheduleComponent,LogoutComponent, ReportComponent,SelectSpecialtyComponent,AuthVerifyComponent, NoDataComponent, NavHeaderComponent, FilterEventsComponent],
})
export class ComponentsModule {}
