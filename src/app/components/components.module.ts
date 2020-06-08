import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavHeaderComponent } from './nav-header/nav-header.component';



@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule
  ],
  declarations: [NavHeaderComponent],
  exports: [
    NavHeaderComponent
  ]
})
export class ComponentsModule {}
