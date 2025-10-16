import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';


@Component({
  selector: 'app-prova-data',
  standalone: false,
  templateUrl: './prova-data.html',
  styleUrl: './prova-data.css'
})
export class ProvaData  implements OnInit, OnChanges, AfterViewInit{
  
  
  @Input() data: any;
  @Output() mandaDatiEvent = new EventEmitter<string>();

  @ViewChild('variabileTemplate') valoreInput! : ElementRef<HTMLInputElement>; 
  
  ngOnInit(): void {
   console.log("onInit");
  }
ngAfterViewInit(): void {
    console.log(this.valoreInput);
  }
  
  ngOnChanges(changes: SimpleChanges): void {
   console.log(changes['data'].currentValue);
   console.log("first change:" + changes['data'].isFirstChange());
  }

  msgDaInivare=">>>>>> messaggio inivato da figlio <<<<<<";

  mandaDati(){
    this.mandaDatiEvent.emit(this.msgDaInivare);
  }

  onClick(){
    console.log(this.valoreInput.nativeElement.value);
  }

  title = 'corso Angular'
  oggi = new Date();
  numero=12.512345667


  colore = '';
  cambioVoloreEvid(coloreEvid:string){
    this.colore = coloreEvid;
  }
}
