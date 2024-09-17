import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {WeatherData} from "../../models/weather/weather.model";
import {WeatherService} from "../../services/weather.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-weather',
  standalone: true,
  providers: [WeatherService],
  templateUrl: './weather.component.html'
})
export class WeatherComponent implements OnInit, OnDestroy,OnChanges {
  @Input() weather!: WeatherData;
  weatherIcon: string = '';
  weatherLowestTemperature: number = 0;
  weatherHighestTemperature: number = 0;
  weatherDate: string = "";
  private weatherSubscription: Subscription = new Subscription();

  constructor(private weatherService: WeatherService) {
  }

  ngOnInit(): void {
    this.updateWeatherData();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['weather'] && changes['weather'].currentValue) {
      this.updateWeatherData();
    }
  }

  ngOnDestroy(): void {
    this.weatherSubscription.unsubscribe();
  }

  private updateWeatherData(): void {
    if (this.weather) {
      this.weatherSubscription = this.weatherService.getWeatherIcon(this.weather).subscribe(icon => this.weatherIcon = icon);
      this.weatherHighestTemperature = Math.max(...this.weather.hourly.temperature2m);
      this.weatherLowestTemperature = Math.min(...this.weather.hourly.temperature2m);
      const date: Date = new Date(this.weather.currentWeather.time);
      this.weatherDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    }
  }
}
