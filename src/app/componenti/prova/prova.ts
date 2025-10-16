import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-prova',
  standalone: false,
  templateUrl: './prova.html',
  styleUrl: './prova.css'
})
export class Prova implements OnInit{
  
  constructor(private cdr: ChangeDetectorRef){ // per controllare se ci sono cambiamenti 
  }
   
  isDisabled = false;
  cani = [
    {
      nome:'roger',
      razza:'golden',
      descrizione:"bala bla bla uiuiuiuiui uini ecc.."
    }
  ]
  async ngOnInit(): Promise<void> {
    console.log("onInit " + this.isDisabled);
    await this.wait(5000);
    this.isDisabled = !this.isDisabled;
    console.log("onInit " + this.isDisabled);
    this.cdr.detectChanges(); // forza aggiornamento manuale
  }


  wait(ms: number){
    return new Promise( resolve => setTimeout(resolve, ms));
  }
  hoCliccato(e:any){
    console.group(e);
  }

  onInput(e:Event){
    console.log((<HTMLInputElement>e.target).value);
  }
  title ="Corso di Angular";
  setTitle(e:any){
    this.title="ho cliccato sul bottone";
  }

  daVedere:boolean = false;

}
