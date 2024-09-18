import {Component, Input, OnChanges, OnDestroy, SimpleChanges} from '@angular/core';
import {WeatherData} from "../../models/weather/weather.model";
import {WeatherService} from "../../services/weather.service";
import {Subscription} from "rxjs";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-weather',
  standalone: true,
  providers: [WeatherService],
  imports: [
    NgForOf
  ],
  templateUrl: './weather.component.html'
})
export class WeatherComponent implements OnDestroy, OnChanges {
  @Input() weather!: WeatherData;
  weatherIcon: string = '';
  weatherLowestTemperature: number = 0;
  weatherHighestTemperature: number = 0;
  weatherDate: string = "";
  hourlyWeather: [string, number][] = [];

  private weatherSubscription: Subscription = new Subscription();

  constructor(private weatherService: WeatherService) {
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

      this.weatherDate = this.weather.currentWeather.time
        .toString()
        .slice(11, 16);

      this.weatherService.getHourlyWeather(this.hourlyWeather, this.weather);

      const temperatures = this.hourlyWeather.map(entry => entry[1]);
      this.weatherHighestTemperature = Math.max(...temperatures);
      this.weatherLowestTemperature = Math.min(...temperatures);
    }
  }
}
