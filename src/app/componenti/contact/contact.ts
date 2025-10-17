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
  persona:any;
  isDetaglio:boolean=false;

  constructor(private service:ServiceProva,
              private route:ActivatedRoute
  ){}
  
  ngOnInit(): void {
    if (this.route.snapshot.paramMap.get('id')){
      this.isDetaglio = true;
      this.persona = this.service.getPersona(parseInt(this.route.snapshot.paramMap.get('id')));
      console.log(this.persona);
    } else {
      this.isDetaglio = false;
      this.persone = this.service.getPersone();
    }


   }

}
