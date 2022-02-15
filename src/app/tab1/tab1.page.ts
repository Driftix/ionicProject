import {Component, OnInit} from '@angular/core';
import { RequestService} from '../Services/request.service';
import {EventsService} from '../Services/events.service';
import {MapService} from '../Services/map.service';
import {Map, tileLayer, marker,map} from 'leaflet';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{
  recherche: string;
  constructor(private requestService: RequestService, private event: EventsService, private mapService: MapService) {
    this.recherche = '';
    if(this.requestService.arrets.length === 0){this.requestService.buildArrets();}
    if(this.requestService.lignes.length === 0){this.requestService.buildLignes();}
    this.event.subscribe('BuildDone',(data)=>{
      if(data){this.start();}
    });
  }

  start(){
    this.mapService.generateMap(45.1817397, 5.7181382);
    console.log(this.mapService.map.getBounds());
    this.mapService.generatePoints(45.1817397, 5.7181382,2000);
  }

  //Fonction par défaut de ionic !

  ionViewDidEnter() {
  }
  ngOnInit() {

  }
  recuperationRecherche(){

    //console.log(this.uneRecherche);
    console.log(this.recherche);
  }

}
