import { Component } from '@angular/core';

@Component({
  selector: 'app-prova-persone',
  standalone: false,
  templateUrl: './prova-persone.html',
  styleUrl: './prova-persone.css'
})
export class ProvaPersone {
  persone =[
    { nome:'Luca', cognome:'Purino', isOnline:true, colore:'green'},
    { nome:'Paola', cognome:'Strumel', isOnline:false, colore:'red'},
    { nome:'Anna', cognome:'Berola', isOnline:true, colore:'grey'},
    { nome:'Marcello', cognome:'Zuaca', isOnline:false, colore:'blue'},
    { nome:'Francesco', cognome:'Andreoti', isOnline:true, colore:'pink'}
  ]

  numero = 9;
  stringa = 'Donald';
  coloreOn = 'green';
  coloreOff = 'red';
}
