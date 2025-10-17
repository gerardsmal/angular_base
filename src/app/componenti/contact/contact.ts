import { Component, OnInit } from '@angular/core';
import { ServiceProva } from '../../services/service-prova';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-contact',
  standalone: false,
  templateUrl: './contact.html',
  styleUrl: './contact.css'
})
export class Contact implements OnInit{
  persone:any;
 
  constructor(private service:ServiceProva             
  ){}
  
  ngOnInit(): void {
      this.persone = this.service.getPersone();
    }

}
