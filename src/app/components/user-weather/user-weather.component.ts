import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {User} from "../../models/user/user.model";
import {NgIf} from "@angular/common";

import {RouterLink, RouterOutlet} from "@angular/router";
import {UserComponent} from "../user/user.component";
import {WeatherComponent} from "../weather/weather.component";
import {WeatherData} from "../../models/weather/weather.model";
import { Subscription} from "rxjs";
import {WeatherService} from "../../services/weather.service";
import {UserMapComponent} from "../user-map/user-map.component";

@Component({
  selector: 'user-weather',
  standalone: true,
  imports: [
    NgIf,
    RouterLink,
    RouterOutlet,
    UserComponent,
    WeatherComponent,
    UserMapComponent
  ],

  providers: [UserService, WeatherService],
  templateUrl: './user-weather.component.html'
})
export class UserWeatherComponent implements OnInit, OnDestroy {
  user: User = {
    gender: 'unknown',
    name: {
      title: 'Default Title',
      first: 'Default',
      last: 'Name',
    },
    location: {
      street: {
        number: 0,
        name: 'Default Street',
      },
      city: 'Unknown',
      state: 'Unknown',
      country: 'Unknown',
      postcode: 0,
      coordinates: {
        latitude: '0',
        longitude: '0',
      },
      timezone: {
        offset: '0:00',
        description: 'Default Timezone',
      },
    },
    email: 'default@example.com',
    login: {
      uuid: 'default-uuid',
      username: 'defaultUser',
      password: 'defaultPassword',
      salt: 'defaultSalt',
      md5: 'defaultMD5',
      sha1: 'defaultSHA1',
      sha256: 'defaultSHA256',
    },
    dob: {
      date: '1970-01-01T00:00:00.000Z',
      age: 0,
    },
    registered: {
      date: '1970-01-01T00:00:00.000Z',
      age: 0,
    },
    phone: '000-0000000',
    cell: '000-0000000',
    id: {
      name: 'ID',
      value: '0000000000',
    },
    picture: {
      large: 'https://via.placeholder.com/100',
      medium: 'https://via.placeholder.com/100',
      thumbnail: 'https://via.placeholder.com/100',
    },
    nat: 'Unknown',
  };


  weather: WeatherData = {
    latitude: 0,
    longitude: 0,
    generationtimeMs: 0,
    utcOffsetSeconds: 0,
    timezone: 'UTC',
    timezoneAbbreviation: 'UTC',
    elevation: 0,
    currentWeatherUnits: {
      time: 'N/A',
      interval: 'N/A',
      temperature: '°C',
      windspeed: 'km/h',
      winddirection: 'degrees',
      isDay: 'boolean',
      weathercode: '1'
    },
    currentWeather: {
      time: '2024-09-17T12:00:00Z',
      interval: 3600,
      temperature: 20,
      windspeed: 15,
      winddirection: 270,
      isDay: 1,
      weathercode: 1
    },
    hourlyUnits: {
      time: 'ISO 8601',
      temperature2m: '°C'
    },
    hourly: {
      time: ['2024-09-17T12:00:00Z', '2024-09-17T13:00:00Z', '2024-09-17T14:00:00Z'],
      temperature2m: [20, 22, 21]
    }
  };

  isLoading: boolean = true;
  users: User[] = [];
  private userSubscription: Subscription = new Subscription();
  private weatherSubscription: Subscription = new Subscription();

  constructor(private userService: UserService, private weatherService: WeatherService) {
  }

  ngOnInit(): void {
    this.userSubscription = this.userService.getUser().subscribe(user => {
      this.user = user;
      this.weatherSubscription = this.weatherService.initWeatherUpdate(this.user.location.coordinates)
        .subscribe(weather => {
          this.weather = weather;
          this.isLoading = false;
        });
    });

    const savedUsers = localStorage.getItem('users');
    this.users = savedUsers ? JSON.parse(savedUsers) : [];
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
    this.weatherSubscription.unsubscribe();
  }

  save(): void {
    this.userService.saveUser(this.user);
  }
}
