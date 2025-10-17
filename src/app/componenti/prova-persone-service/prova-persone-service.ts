import { Component, OnInit } from '@angular/core';
import { ServiceProva } from '../../services/service-prova';

@Component({
  selector: 'app-prova-persone-service',
  standalone: false,
  templateUrl: './prova-persone-service.html',
  styleUrl: './prova-persone-service.css'
})
export class ProvaPersoneService implements OnInit{

  persone:any;

  constructor(private service:ServiceProva){
  }
  ngOnInit(): void {
    this.persone = this.service.getPersone();
  }


}
