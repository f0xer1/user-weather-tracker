import {Component, OnDestroy, OnInit} from '@angular/core';
import {RouterLink, RouterOutlet} from "@angular/router";
import {NgForOf, NgIf} from "@angular/common";
import {UserComponent} from "../user/user.component";
import {User} from "../../models/user/user.model";
import {WeatherComponent} from "../weather/weather.component";
import {WeatherService} from "../../services/weather.service";
import {forkJoin, Subscription} from "rxjs";

@Component({
  selector: 'saved-users-list',
  standalone: true,
  imports: [
    RouterLink,
    RouterOutlet,
    NgForOf,
    UserComponent,
    WeatherComponent,
    NgIf
  ], providers: [WeatherService],
  templateUrl: './saved-users-list.component.html'
})
export class SavedUsersListComponent implements OnDestroy, OnInit {
  users: User[] = [];
  userWeather: {[key: string]: any} = {};
  private weatherListSubscription: Subscription = new Subscription();
  isLoading: boolean = true;
  constructor(private weatherService: WeatherService) {
  }

  ngOnInit(): void {

    const savedUsers = localStorage.getItem('users');
    if (savedUsers) {
      this.users = JSON.parse(savedUsers);
      this.loadWeatherForUsers();
    }else {
      this.isLoading = false;
    }
  }
  ngOnDestroy(): void {
    this.weatherListSubscription.unsubscribe();
  }
  loadWeatherForUsers() {
    const weatherObservables = this.users.map(user =>
      this.weatherService.getWeatherByCoordinates(user.location.coordinates)
    );

    this.weatherListSubscription =  forkJoin(weatherObservables).subscribe(weatherData => {
      this.users.forEach((user, index) => {
        this.userWeather[user.email] = weatherData[index];
      });
      this.isLoading = false;
    });
  }
}
