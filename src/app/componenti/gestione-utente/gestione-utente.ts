import { Component, OnInit } from '@angular/core';
import { UtenteService } from '../../services/utente-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gestione-utente',
  standalone: false,
  templateUrl: './gestione-utente.html',
  styleUrl: './gestione-utente.css',
  host: { ngSkipHydration: 'true' }   // non fa l'hydration perché il signal si aggiorna dopo
})
export class GestioneUtente implements OnInit{

  utente:any;
  selectedUtente:any;
  constructor(private service:UtenteService,
              private routing:Router
  ){}

  ngOnInit(): void {
    console.log("ngOnInit")
    this.utente = this.service.utente;
    this.service.list(null, null);
    console.log("after service")

  }
  onSelectedUtente(utente:any){
    console.log(utente);
    this.routing.navigate(["utente/" , utente.id])
  }
}
