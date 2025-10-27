import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { PersoneService } from '../../services/persone-service';

@Component({
  selector: 'app-contact',
  standalone: false,
  templateUrl: './contact.html',
  styleUrls: ['./contact.css']
})
export class Contact implements OnInit {

persone:any;

  constructor(private service: PersoneService) { 
  }

  ngOnInit(): void {
    console.log("onInit")
    this.persone = this.service.persone;  // init delle persone formato signal
    this.service.caricaPersone();         // il subcribe non serve perché gestito dal servizio
  }
}
