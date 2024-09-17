export interface CurrentWeatherUnits {
  time: string;
  interval: string;
  temperature: string;
  windspeed: string;
  winddirection: string;
  isDay: string;
  weathercode: string;
}

export interface CurrentWeather {
  time: string;
  interval: number;
  temperature: number;
  windspeed: number;
  winddirection: number;
  isDay: number;
  weathercode: number;
}

export interface HourlyUnits {
  time: string;
  temperature2m: string;
}

export interface Hourly {
  time: string[];
  temperature2m: number[];
}

export interface WeatherData {
  latitude: number;
  longitude: number;
  generationtimeMs: number;
  utcOffsetSeconds: number;
  timezone: string;
  timezoneAbbreviation: string;
  elevation: number;
  currentWeatherUnits: CurrentWeatherUnits;
  currentWeather: CurrentWeather;
  hourlyUnits: HourlyUnits;
  hourly: Hourly;
}
