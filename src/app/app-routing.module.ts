import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './services/utils/auth-guard.service';
const routes: Routes = [
  {
    path: '',
    redirectTo: '/app/tabs/home',
    pathMatch: 'full'
  },
  {
    path: 'app',
   /*  canActivate: [AuthGuardService], */
    loadChildren: () => import('./tabs/tabs.module').then( m => m.TabsPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
/* 
  {
    path: 'reminder-detail',
    loadChildren: () => import('./reminder-detail/reminder-detail.module').then( m => m.ReminderDetailPageModule)
  }, */
 /*  {
    path: 'event-detail',
    loadChildren: () => import('./pages/event-detail/event-detail.module').then( m => m.EventDetailPageModule)
  }, */
/*   {
    path: 'create-appointment',
    loadChildren: () => import('./pages/create-appointment/create-appointment.module').then( m => m.CreateAppointmentPageModule)
  }, */

 /*  {
    path: 'notifications',
    loadChildren: () => import('./pages/notifications/notifications.module').then( m => m.NotificationsPageModule)
  }, */
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
