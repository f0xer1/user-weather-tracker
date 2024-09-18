import {Injectable} from "@angular/core";
import {WeatherData} from "../models/weather/weather.model";
import {WEATHER_ICONS} from "../../assets/data/weather/weather-icons";
import {concat, interval, map, Observable, of, switchMap} from "rxjs";
import {Coordinates} from "../models/user/user.model";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment.development";

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient) {
  }

  getWeatherIcon(weather: WeatherData): Observable<string> {
    const timeOfDay = weather.currentWeather.isDay === 1 ? 'day' : 'night';
    const codeStr = weather.currentWeather.weathercode.toString();
    return of((WEATHER_ICONS as any)[codeStr][timeOfDay]?.image || '');
  }

  getWeatherByCoordinates(coordinates: Coordinates): Observable<WeatherData> {
    const weatherUrl = `${environment.WEATHER_BASE_URL}?latitude=${coordinates.latitude}&longitude=${coordinates.longitude}&current_weather=true&hourly=temperature_2m`;
    return this.http.get<any>(weatherUrl).pipe(
      map(response => {
        return this.convertObjectKeysToCamelCase(response) as WeatherData;
      })
    );
  }

  initWeatherUpdate(coordinates: Coordinates, intervalTime: number = 300000): Observable<WeatherData> {
    const initialFetch = this.getWeatherByCoordinates(coordinates);
    const periodicFetch = interval(intervalTime).pipe(
      switchMap(() => this.getWeatherByCoordinates(coordinates))
    );
    return concat(initialFetch, periodicFetch);
  }

  getHourlyWeather(hourlyWeather: [string, number][], weather: WeatherData) {
    const currentHour = weather.currentWeather.time.slice(0, -2) + "00";
    const {time: timeArr, temperature2m: timeTemperature} = weather.hourly;
    const index = timeArr.indexOf(currentHour);
    timeArr.slice(index, index + 24).forEach((time, i) => {
      hourlyWeather.push([time, timeTemperature[index + i]]);
    });
  }

  private toCamelCase(s: string): string {
    return s.replace(/_./g, match => match.charAt(1).toUpperCase());
  }

  private convertObjectKeysToCamelCase(obj: any): any {
    if (obj == null) return obj;

    if (Array.isArray(obj)) {
      return obj.map(this.convertObjectKeysToCamelCase);
    }

    if (typeof obj === 'object') {
      return Object.entries(obj).reduce((acc, [key, value]) => {
        acc[this.toCamelCase(key)] = this.convertObjectKeysToCamelCase(value);
        return acc;
      }, {} as Record<string, any>);
    }

    return obj;
  }


}
