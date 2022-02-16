import {Component, OnInit} from '@angular/core';
import {RequestService} from '../Services/request.service';
import {ILigne} from '../Interfaces/iligne';
import {EventsService} from '../Services/events.service';
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit{
  navette: Array<ILigne> = [];
  tram: Array<ILigne> = [];
  chrono: Array<ILigne> = [];
  proximo: Array<ILigne> = [];
  flexo: Array<ILigne> = [];
  carsRegionExpress: Array<ILigne> = [];
  carsRegion: Array<ILigne> = [];
  touGo: Array<ILigne> = [];
  paysVoironnais: Array<ILigne> = [];

  constructor(private serviceResquest: RequestService, private event: EventsService) {
    if(this.serviceResquest.arrets.length === 0 && this.serviceResquest.lignes.length === 0){this.serviceResquest.buildArrets();this.serviceResquest.buildLignes();}else{
      this.startRecupLigne();
    }
    this.event.subscribe('BuildDone',(data)=>{
      if(data){
        this.startRecupLigne();
      }
    });
  }

  recupLigne()
  {
    //console.log(this.serviceResquest.lignes);
    for (const ligne of this.serviceResquest.lignes) {
      //console.log(ligne);
        switch(ligne.type) {
          case 'TRAM':
            this.tram.push(ligne);
            break;
          case 'NAVETTE':
            this.navette.push(ligne);
            break;
          case 'CHRONO':
            this.chrono.push(ligne);
            break;
          case 'PROXIMO':
            this.proximo.push(ligne);
            break;
          case 'FLEXO':
            this.flexo.push(ligne);
            break;
          case 'C38_STRUCT':
            this.carsRegionExpress.push(ligne);
            break;
          case 'C38_AUTRE':
            this.carsRegion.push(ligne);
            break;
          case 'Structurantes':
            this.touGo.push(ligne);
            break;
          case 'MCO':
            this.paysVoironnais.push(ligne);
            break;
        }
    }
  }
  ngOnInit() {

  }

  startRecupLigne(){
    this.recupLigne();
  }


  async displayArrets(ligne: ILigne) {
    //Y'a plus qu'a faire la fenêtre et afficher les informations mon cochon
    const arrets = await this.serviceResquest.requestLignesPourArrets(ligne);
    console.log(arrets['features'][0]['properties']['ZONES_ARRET']);
    //On verra plus tard pour mettre les bons noms
  }
}
