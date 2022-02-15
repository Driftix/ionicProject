import {Marker,LatLngExpression,MarkerOptions} from 'leaflet';

export class DataMarker extends Marker {
  customDataid: any;
  constructor(latLng: LatLngExpression, data: any, options?: MarkerOptions){
    super(latLng, options);
    this.setData(data);
  }
  getData(){
    return this.customDataid;
  }
  setData(data: any){
    this.customDataid = data;
  }

}
