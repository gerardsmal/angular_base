import { Component, OnInit, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.css'
})
export class App implements OnInit{
  protected readonly title = signal('frontend');

   ngOnInit(): void {
    //this.persone = this.persone0;
  }
  /*
  persone = [{}];
 
  persone0 =[
    { nome:'Luca', cognome:'Purino', isOnline:true, colore:'green'},
    { nome:'Paola', cognome:'Strumel', isOnline:false, colore:'red'},
    { nome:'Anna', cognome:'Berola', isOnline:true, colore:'grey'},
    { nome:'Marcello', cognome:'Zuaca', isOnline:false, colore:'blue'},
    { nome:'Francesco', cognome:'Andreoti', isOnline:true, colore:'pink'}
  ]

   persone1 =[
    { nome:'Cirio', cognome:'Davena', isOnline:true, colore:'green'},
    { nome:'Giuseppe', cognome:'Cipro', isOnline:false, colore:'red'},
    { nome:'Donald', cognome:'Duck', isOnline:true, colore:'grey'},
    { nome:'Daisy', cognome:'Beautiful', isOnline:false, colore:'blue'},
    { nome:'Pareino', cognome:'Blueway', isOnline:true, colore:'pink'}
  ]
  onClick(){
    this.persone = this.persone1;
  }
  onRestore(){
    this.persone = this.persone0;
  }
  leggoMessaggioRicevuto(value: string){
    console.log("padre msg ricevuto :" + value);
  }
  */

}
