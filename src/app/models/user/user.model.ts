export interface User {
  name: string;
  gender: string;
  profileImage: string;
  location: Location;
  email: string;
}

export interface Location {
  coordinates: Coordinates;
  city: string;
  country: string;
  postCode: string;
  state: string;

}
export interface Coordinates{
  latitude: number;
  longitude: number;
}
