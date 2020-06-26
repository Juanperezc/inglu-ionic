import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EventDetailPageRoutingModule } from './event-detail-routing.module';

import { EventDetailPage } from './event-detail.page';
import { RatingModule } from 'ng-starrating';
import { ReportComponent } from 'src/app/components/report/report.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { SuggestionComponent } from 'src/app/components/suggestion/suggestion.component';

@NgModule({
  imports: [
    RatingModule,
    CommonModule,
    ComponentsModule,
    FormsModule,
    IonicModule,
    EventDetailPageRoutingModule
  ],
  entryComponents: [
    ReportComponent,SuggestionComponent
  ],
  declarations: [EventDetailPage]
})
export class EventDetailPageModule {}
