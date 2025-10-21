import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PersoneService } from '../../services/persone-service';

@Component({
  selector: 'app-contact-details',
  standalone: false,
  templateUrl: './contact-details.html',
  styleUrl: './contact-details.css'
})
export class ContactDetails implements OnInit {

  id: number;
  persona:any;
  isError: boolean=false;
  msg:string=null;

  updateform: FormGroup = new FormGroup({
    nome: new FormControl(null),
    cognome: new FormControl(null),
    email: new FormControl(null),
    colore: new FormControl(null)
  });

  constructor(private service: PersoneService, 
             private route: ActivatedRoute,
            private cdRef:ChangeDetectorRef) {
  }
  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = + params.get('id');
      this.service.getPersona(this.id)
        .subscribe({
          next: ((resp: any) => {
            console.log(resp);
            this.persona = resp;
            this.updateform = new FormGroup({
              nome: new FormControl(resp.nome, Validators.required),
              cognome: new FormControl(resp.cognome, Validators.required),
              email: new FormControl(resp.email, [Validators.required, Validators.email]),
              colore: new FormControl(resp.colore)
            })
            this.isError=false;
            this.cdRef.detectChanges();
          }),
          error: ((resp: any) => {
            this.msg = resp.error;
            this.isError=true;
        })


        })
    })
  }

  onSubmit(){

    }
}
