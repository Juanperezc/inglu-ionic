import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfilePage } from './profile.page';
import { ExploreContainerComponentModule } from '../../explore-container/explore-container.module';
import { ComponentsModule } from 'src/app/components/components.module';
import { LogoutComponent } from 'src/app/components/logout/logout.component';
import { ImagePicker } from '@ionic-native/image-picker/ngx';

@NgModule({
  imports: [
    ComponentsModule,
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ExploreContainerComponentModule,
    RouterModule.forChild([{ path: '', component: ProfilePage }])
  ],
  entryComponents: [
    LogoutComponent
  ],
  declarations: [ProfilePage],
  providers: [
    ImagePicker
  ]
})
export class ProfilePageModule {}
