import {Component, DestroyRef, inject, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {User} from "../../models/user/user.model";
import {NgIf} from "@angular/common";
import {RouterLink, RouterOutlet} from "@angular/router";
import {UserComponent} from "../user/user.component";
import {WeatherComponent} from "../weather/weather.component";
import {WeatherData} from "../../models/weather/weather.model";
import {switchMap} from "rxjs";
import {WeatherService} from "../../services/weather.service";
import {UserMapComponent} from "../user-map/user-map.component";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

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
  templateUrl: './user-weather.component.html',
  styleUrls: ['./user-weather.component.css']
})
export class UserWeatherComponent implements OnInit {
  user!: User;
  weather!: WeatherData;

  private destroyRef = inject(DestroyRef);
  isLoading: boolean = true;
  users: User[] = [];

  constructor(private userService: UserService, private weatherService: WeatherService) {
  }

  ngOnInit(): void {
    this.userService.getUser().pipe(
      switchMap(user => {
        this.user = user;
        this.isLoading = true;
        return this.weatherService.initWeatherUpdate(this.user.location.coordinates);
      }),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(weather => {
      this.weather = weather;
      this.isLoading = false;
    });
    this.users = this.userService.getUsers()
  }

  save(): void {
    this.userService.saveUser(this.user);
  }
}
