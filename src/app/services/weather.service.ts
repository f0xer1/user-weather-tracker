import {Injectable} from "@angular/core";
import {WeatherData} from "../models/weather/weather.model";
import {WEATHER_ICONS} from "../../assets/data/weather/weather-icons";
import {map, Observable, of} from "rxjs";
import {Coordinates} from "../models/user/user.model";
import {HttpClient} from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private baseWeatherUrl = 'https://api.open-meteo.com/v1/forecast';

  constructor(private http: HttpClient) {
  }

  getWeatherIcon(weather: WeatherData): Observable<string> {
    console.log(weather);
    const timeOfDay = weather.currentWeather.isDay === 1 ? 'day' : 'night';
    const codeStr = weather.currentWeather.weathercode.toString();
    return of((WEATHER_ICONS as any)[codeStr][timeOfDay]?.image || '');
  }

  getWeatherByCoordinates(coordinates: Coordinates): Observable<WeatherData> {
    const weatherUrl = `${this.baseWeatherUrl}?latitude=${coordinates.latitude}&longitude=${coordinates.longitude}&current_weather=true&hourly=temperature_2m`;
    return this.http.get<any>(weatherUrl).pipe(
      map(response => {
        return this.convertObjectKeysToCamelCase(response) as WeatherData;
      })
    );
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
