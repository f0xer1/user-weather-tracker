import { Component, Input } from '@angular/core';
import { Weather } from "../../models/weather/Weather";

@Component({
  selector: 'app-weather',
  standalone: true,
  templateUrl: './weather.component.html'
})
export class WeatherComponent {
  @Input() weather!: Weather;
}
