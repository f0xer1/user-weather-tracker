import {Routes} from '@angular/router';

export const routes: Routes = [
  {
    path: 'user-weather',
    loadComponent: () => import('./components/user-weather/user-weather.component').then(m => m.UserWeatherComponent),
  },
  {
    path: 'saved-users-list',
    loadComponent: () => import('./components/saved-users-list/saved-users-list.component').then(m => m.SavedUsersListComponent),
  },
  {
    path: '',
    redirectTo: 'user-weather',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'user-weather'
  }
];
