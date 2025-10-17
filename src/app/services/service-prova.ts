import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServiceProva {
    persone =[
    { nome:'Luca', cognome:'Purino', isOnline:true, colore:'green'},
    { nome:'Paola', cognome:'Strumel', isOnline:false, colore:'red'},
    { nome:'Anna', cognome:'Berola', isOnline:true, colore:'grey'},
    { nome:'Marcello', cognome:'Zuaca', isOnline:false, colore:'blue'},
    { nome:'Francesco', cognome:'Andreoti', isOnline:true, colore:'pink'}
  ]
  getPersone(){
    return this.persone;
  }
  getPersona(index:number){
    return this.persone[index];
  }
}
