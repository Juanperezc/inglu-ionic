import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('./home/home.module').then(m => m.HomePageModule)
          }
        ]
      },
      {
        path: 'appointments',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('./appointments/appointments.module').then(m => m.AppointmentsPageModule)
          }
        ]
      },
      {
        path: 'events',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('./events/events.module').then(m => m.EventsPageModule)
          }
        ]
      },
      {
        path: 'profile',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('./profile/profile.module').then(m => m.ProfilePageModule)
          },
        ]
      },
      {
        path: 'reminders',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('./reminders/reminders.module').then(m => m.RemindersPageModule)
          },
        ]
      },
      {
        path: '',
        redirectTo: '/app/tabs/home',
        pathMatch: 'full'
      },
      
    ]
  },
  {
    path: 'notifications',
    loadChildren: () => import('../pages/notifications/notifications.module').then( m => m.NotificationsPageModule)
  },
  {
    path: 'settings',
    loadChildren: () => import('../pages/settings/settings.module').then( m => m.SettingsPageModule)
  },
  {
    path: 'post-detail/:id',
    loadChildren: () => import('../pages/post-detail/post-detail.module').then( m => m.PostDetailPageModule)
  },
  {
    path: 'appointment-detail/:id',
    loadChildren: () => import('../pages/appointment-detail/appointment-detail.module').then( m => m.AppointmentDetailPageModule)
  },
  {
    path: 'event-detail/:id',
    loadChildren: () => import('../pages/event-detail/event-detail.module').then( m => m.EventDetailPageModule)
  },
  {
    path: 'create-appointment/:id',
    loadChildren: () => import('../pages/create-appointment/create-appointment.module').then( m => m.CreateAppointmentPageModule)
  },
  {
    path: 'create-reminder',
    loadChildren: () => import('../reminder-detail/reminder-detail.module').then( m => m.ReminderDetailPageModule)
  },
  {
    path: 'reminder-detail/:id',
    loadChildren: () => import('../reminder-detail/reminder-detail.module').then( m => m.ReminderDetailPageModule)
  },
  {
    path: '',
    redirectTo: '/app/tabs/home',
    pathMatch: 'full'
  },
  {
    path: 'reminders',
    loadChildren: () => import('./reminders/reminders.module').then( m => m.RemindersPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
