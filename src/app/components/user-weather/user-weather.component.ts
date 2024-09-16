import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {UserModel} from "../../models/user/user.model";
import {NgIf} from "@angular/common";
import {Weather} from "../../models/weather/Weather";
import {RouterLink, RouterOutlet} from "@angular/router";
import {UserComponent} from "../user/user.component";
import {WeatherComponent} from "../weather/weather.component";

@Component({
  selector: 'user-weather',
  standalone: true,
  imports: [
    NgIf,
    RouterLink,
    RouterOutlet,
    UserComponent,
    WeatherComponent
  ],

  providers: [UserService],
  templateUrl: './user-weather.component.html'
})
export class UserWeatherComponent implements OnInit {
  user: UserModel = {
    name: 'Default Name',
    gender: 'unknown',
    profileImage: 'https://via.placeholder.com/100',
    location: {
      coordinates: {
        latitude: 0,
        longitude: 0
      },
      city: 'Unknown',
      country: 'Unknown',
      postCode: '00000',
      state: 'Unknown'
    },
    email: 'default@example.com'
  };

  weather: Weather = {
    temperature: 0,
    windSpeed: 0,
    windDirection: 0,
    time: ''
  };
  isLoading: boolean = true;
  users: UserModel[] = [];

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.userService.getUser().subscribe(user => {
      this.user = user;
      this.userService.getWeatherByCoordinates(this.user.location.coordinates).subscribe(weather => {
        this.weather = weather;
        this.isLoading = false;
      });
    });

    const savedUsers = localStorage.getItem('users');
    if (savedUsers) {
      this.users = JSON.parse(savedUsers);
    } else {
      this.users = [];
    }
  }


  save(): void {
    const savedUsers = localStorage.getItem('users');
    let users: UserModel[] = [];

    if (savedUsers) {
      users = JSON.parse(savedUsers);
    }
    if (!users.some(u => u.email === this.user.email)) {
      users.push(this.user);
      localStorage.setItem('users', JSON.stringify(users));
      console.log("UserModel info saved:", users);
    } else {
      console.log("UserModel already saved.");
    }
  }

}
