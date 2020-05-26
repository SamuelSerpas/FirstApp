import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../guard/auth.guard';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: 'home',
    canActivate: [AuthGuard],
    component: HomePage,
    children: [
    {
    path: 'feed',
    canActivate: [AuthGuard],
    loadChildren: () =>
    import('../pages/feed/feed.module').then(m => m.FeedPageModule)
    },
    {
    path: 'messages',
    canActivate: [AuthGuard],
    loadChildren: () =>
    import('../pages/messages/messages.module').then(
    m => m.MessagesPageModule
    )
    },
    {
    path: 'notifications',
    canActivate: [AuthGuard],
    loadChildren: () =>
    import('../pages/notifications/notifications.module').then(
    m => m.NotificationsPageModule
    )
    },
    {
    path: 'settings',
    canActivate: [AuthGuard],
    loadChildren: () =>
    import('../pages/settings/settings.module').then(
    m => m.SettingsPageModule
    )
    }
    ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
