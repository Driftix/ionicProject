import { Injectable } from '@angular/core';
import {Map, tileLayer, marker, map, Icon, CircleMarker, Point, LatLng, Layer, Marker} from 'leaflet';
import { antPath } from 'leaflet-ant-path';
import {RequestService} from './request.service';
import {DataMarker} from '../Classes/data-marker';
import {IArretPourLigne} from '../Interfaces/iarret-pour-ligne';


@Injectable({
  providedIn: 'root'
})
export class MapService {
  map: Map;
  constructor(private requestService: RequestService) {}
  generateMap(cooX: number, cooY: number){
    this.map = map('mapId').setView([cooX, cooY], 15);
    tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png', {
      attribution: '',
    }).addTo(this.map);

  }
  async generatePoints(cooX: number, cooY: number, distance: number){
    const arretsAuxAlentours = await this.requestService.requestArretPourLongitudeLatitude(cooY, cooX, distance);
    // eslint-disable-next-line @typescript-eslint/no-shadow
    let marker: DataMarker;
    for(let arret of arretsAuxAlentours){
      //Changer plus tard
      const data = await this.requestService.requestTypeLigne(arret['lines'][0]);
    if(data[0]['mode'] === 'BUS'){
        marker = new DataMarker(new LatLng(arret['lat'],arret['lon']),arret);
        marker.on('click',this.displayMarkerProperties);
        marker.bindPopup(arret['name']);
        this.map.addLayer(marker);
      }
    }
  }


  displayMarkerProperties(e){
    //this.map.openPopup(e.target.customDataid.name);
    console.log(e.target.customDataid.name);
  }
}
