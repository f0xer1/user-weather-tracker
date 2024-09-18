import {Component, DestroyRef, inject, Input, OnChanges, SimpleChanges} from '@angular/core';
import {WeatherData} from "../../models/weather/weather.model";
import {WeatherService} from "../../services/weather.service";
import {NgForOf} from "@angular/common";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

@Component({
  selector: 'app-weather',
  standalone: true,
  providers: [WeatherService],
  imports: [
    NgForOf
  ],
  templateUrl: './weather.component.html'
})
export class WeatherComponent implements OnChanges {
  @Input() weather!: WeatherData;
  weatherIcon: string = '';
  weatherLowestTemperature: number = 0;
  weatherHighestTemperature: number = 0;
  weatherDate: string = "";
  hourlyWeather: [string, number][] = [];
  private destroyRef = inject(DestroyRef);

  constructor(private weatherService: WeatherService) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    const {weather} = changes;
    if (weather && weather.currentValue) {
      this.updateWeatherData();
    }
  }

  private updateWeatherData(): void {
    if (this.weather) {
      this.weatherService.getWeatherIcon(this.weather).pipe(
        takeUntilDestroyed(this.destroyRef)
      ).subscribe(icon => this.weatherIcon = icon);

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
