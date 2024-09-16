import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {Coordinates, UserModel} from "../models/user/user.model";
import {Weather} from "../models/weather/Weather";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userUrl = 'https://randomuser.me/api/'
  private baseWeatherUrl = 'https://api.open-meteo.com/v1/forecast';

  constructor(private http: HttpClient) {
  }

  getUser(): Observable<UserModel> {
    return this.http.get<any>(this.userUrl).pipe(
      map(response => {
        if (response && response.results && response.results.length > 0) {
          return this.mapToUser(response.results[0]);
        } else {
          throw new Error('No user data found');
        }
      })
    );
  }

  getWeatherByCoordinates(coordinates: Coordinates): Observable<any> {
    const weatherUrl = `${this.baseWeatherUrl}?latitude=${coordinates.latitude}&longitude=${coordinates.longitude}&current_weather=true&hourly=temperature_2m`;

    return this.http.get<any>(weatherUrl).pipe(
      map(response => {
        console.log(response);
          return this.mapToWeather(response);
      })
    );
  }

  private mapToWeather(data: any): Weather {
    return {
      temperature: data.current_weather.temperature,
      windSpeed: data.current_weather.windspeed,
      windDirection: data.current_weather.winddirection,
      time: data.current_weather.time
    };
  }
  private mapToUser(data: any): UserModel {
    return {
      name: `${data.name.first} ${data.name.last}`,
      gender: data.gender,
      profileImage: data.picture.large,
      location: {
        coordinates: {
          latitude: parseFloat(data.location.coordinates.latitude),
          longitude: parseFloat(data.location.coordinates.longitude)
        },
        city: data.location.city,
        country: data.location.country,
        postCode: data.location.postcode.toString(),
        state: data.location.state
      },
      email: data.email
    };
  }

}
