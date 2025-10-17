import { Component, OnInit } from '@angular/core';
import { ServiceProva } from '../../services/service-prova';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-contact-details',
  standalone: false,
  templateUrl: './contact-details.html',
  styleUrl: './contact-details.css'
})
export class ContactDetails implements OnInit{

  id:number;
  persona:any;


  constructor(private service:ServiceProva, private route:ActivatedRoute){
  }
  ngOnInit(): void {
    this.route.paramMap.subscribe((params : ParamMap) =>{
      this.id =+ params.get('id');
      this.persona = this.service.getPersona(this.id);
    })
  }

}
