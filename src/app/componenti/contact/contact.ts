import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { PersoneService } from '../../services/persone-service';

@Component({
  selector: 'app-contact',
  standalone: false,
  templateUrl: './contact.html',
  styleUrls: ['./contact.css']
})
export class Contact implements OnInit {
 persone: any; 

  constructor(private service: PersoneService,
              private cdRef:ChangeDetectorRef
  ) { 
  }

  ngOnInit(): void {
    console.log("onInit")
    this.loadPersone();
  }
  
  loadPersone(){
       this.service.listPersone()
      .subscribe({
        next: ((resp: any) => {
          this.persone = resp;
        //  console.log(this.persone);
          this.cdRef.detectChanges();  // per forzare il binding
        }),
        error: ((resp: any) => {
          console.log(resp.error);
        })
      });
 
  }
}
