import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {IArret} from '../Interfaces/iarret';
import {from} from 'rxjs';
import {ILigne} from '../Interfaces/iligne';
import {map} from 'rxjs/operators';
import {ILignePourArret} from '../Interfaces/iligne-pour-arret';
import {IArretPourLigne} from '../Interfaces/iarret-pour-ligne';
import {EventsService} from './events.service';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  arrets: Array<IArret> = [];
  lignes: Array<ILigne> = [];

  constructor(private http: HttpClient, private event: EventsService) {}

  buildArrets(){
    this.http.get('https://data.mobilites-m.fr/api/bbox/json?types=arret').subscribe((data)=>{
        const tempArret:  Array<{test: any[]}> = data['features'];
        let arret: IArret ={};
        for(const i of tempArret){
          arret ={};
          arret.latitude = i['geometry']['coordinates'][0];
          arret.longitude = i['geometry']['coordinates'][1];
          arret.id = i['properties']['id'];
          arret.nom = i['properties']['LIBELLE'];
          this.arrets.push(arret);
        }
        this.event.publish('BuildDone',true);
    });
  }
  buildLignes(){
    this.http.get('https://data.mobilites-m.fr/api/routers/default/index/routes').subscribe((data)=> {
      let ligne: ILigne = {};
      const test = from([data]);
      const bla = data2 => data2.length;
      const value = test.pipe(map(data2 => bla(data2)));
      value.subscribe(val => {for(let i = 0; i < val; i++) {
          ligne = {};
          ligne.id = data[i]['id'];
          ligne.gtfsId=  data[i]['gtfsId'];
          ligne.shortName = data[i]['shortName'];
          ligne.longName= data[i]['longName'];
          ligne.color= data[i]['color'];
          ligne.textColor= data[i]['textColor'];
          ligne.mode= data[i]['mode'];
          ligne.type= data[i]['type'];
          //console.log(ligne.id);
          this.lignes.push(ligne);
      }
      this.event.publish('BuildDone',false);
      });
    });
  }

  requestLignesPourArrets(ligne: ILigne): Promise<Array<string>>{
      // this.http.get('https://data.mobilites-m.fr/api/lines/json?types=ligne&codes='+ligne.id).subscribe((data)=> {
      //   const lignePourArret: ILignePourArret = {};
      //   lignePourArret.zoneArret = data['features'][0]['properties']['ZONES_ARRET'];
      //   lignePourArret.code = data['features'][0]['properties']['CODE'];
      //   return lignePourArret;
      // });
    return new Promise((resolve,reject)=> {
      this.http.get('https://data.mobilites-m.fr/api/lines/json?types=ligne&codes='+ligne.id).subscribe(
        (data: any) => {
          if (data !== {}) {
            resolve(data);
          } else {
            reject('il y a eu un probleme');
          }
        });
    });
  }

  requestArretPourLignes(arret: IArret): Promise<Array<string>>{
    return new Promise((resolve,reject)=> {
      this.http.get('https://data.mobilites-m.fr/api/linesNear/json?x=' + arret.latitude + '&y=' + arret.longitude + '&dist=5&details=true').subscribe(
        (data: any) => {
          if (data !== {}) {
            resolve(data);
          } else {
            reject('il y a eu un probleme');
          }
        });
    });
      // this.http.get('https://data.mobilites-m.fr/api/linesNear/json?x='+ arret.latitude +'&y=' +arret.longitude +'&dist=5&details=true').subscribe((data)=>{
      //   const arretPourLigne: IArretPourLigne = {};
      //   arretPourLigne.id = data[0]['id'];
      //   arretPourLigne.lat = data[0]['lat'];
      //   arretPourLigne.lon = data[0]['lon'];
      //   arretPourLigne.lines = data[0]['lines'];
      //   arretPourLigne.name = data[0]['name'];
      //   arretPourLigne.zone = data[0]['zone'];
      // });

  }
  requestTypeLigne(nomLigne: string){
    //Faire la requête https://data.mobilites-m.fr/api/routers/default/index/routes?codes= +ligne.lines[0]
    return new Promise((resolve,reject)=> {
      this.http.get('https://data.mobilites-m.fr/api/routers/default/index/routes?codes=' + nomLigne).subscribe(
        (data: any) => {
          if (data !== {}) {
            resolve(data);
          } else {
            reject('il y a eu un probleme');
          }
        });
    });
  }
  requestArretPourLongitudeLatitude(cooX: number, cooY: number, distance: number): Promise<Array<string>>{
    return new Promise((resolve,reject)=> {
      this.http.get('https://data.mobilites-m.fr/api/linesNear/json?x=' + cooX+ '&y=' + cooY+ '&dist='+ distance +'&details=true').subscribe(
        (data: any) => {
          if (data !== {}) {
            resolve(data);
          } else {
            reject('il y a eu un probleme');
          }
        });
    });
  }
}
