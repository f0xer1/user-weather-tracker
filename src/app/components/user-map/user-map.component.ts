import { Component, Input, OnInit } from '@angular/core';
import {icon, latLng, marker, tileLayer} from 'leaflet';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { User } from '../../models/user/user.model';

@Component({
  selector: 'app-user-map',
  standalone: true,
  imports: [LeafletModule],
  templateUrl: './user-map.component.html',
  styleUrls: ['./user-map.component.css']
})
export class UserMapComponent implements OnInit {
  @Input() user!: User;
  lat: number = 0;
  lng: number = 0;

  options: any;

  ngOnInit() {
    if (this.user && this.user.location && this.user.location.coordinates) {
      this.lat = Number(this.user.location.coordinates.latitude);
      this.lng = Number(this.user.location.coordinates.longitude);
    }

    const userMarker = marker([this.lat, this.lng], {
      icon: icon({
        iconSize: [40, 40],
        iconAnchor: [20, 20],
        iconUrl: this.user.picture.thumbnail,
        className: 'rounded-icon'
      })
    });

    this.options = {
      layers: [
        tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' }),
        userMarker
      ],
      zoom: 10,
      center: latLng(this.lat, this.lng)
    };
  }

}
