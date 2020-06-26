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
import { SuggestionComponent } from './suggestion/suggestion.component';

@NgModule({
  imports: [
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
  ],
  entryComponents: [],
  providers: [
    ClaimService,
    ClaimUserService,
    SuggestionService,
    SuggestionUserService,
  ],
  declarations: [ReportComponent, NavHeaderComponent,SuggestionComponent, FilterEventsComponent],
  exports: [ReportComponent, NavHeaderComponent, FilterEventsComponent],
})
export class ComponentsModule {}
