import { Routes } from '@angular/router';
import {UserWeatherComponent} from "./components/user-weather/user-weather.component";
import {SavedUsersListComponent} from "./components/saved-users-list/saved-users-list.component";

export const routes: Routes = [
  {
    path: 'user-weather',
    component: UserWeatherComponent
  },
  {
    path: 'saved-users-list',
    component: SavedUsersListComponent
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
