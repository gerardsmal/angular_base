import { Component, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PersoneService } from '../../services/persone-service';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {
  homeform : FormGroup;

  stato = signal({
     msg : null as string | null,
     isError : false
  })

 

  constructor(private service:PersoneService
  ){}

  ngOnInit(): void {
    this.homeform = new FormGroup({
      nome: new FormControl(null, Validators.required),
      cognome : new FormControl(null, Validators.required),
      email : new FormControl(null, [Validators.required, Validators.email]),
      colore : new FormControl()
    });
  }

  onSubmit(){
   
    this.service.insertPersona({
      nome: this.homeform.value.nome,
      cognome : this.homeform.value.cognome,
      email : this.homeform.value.email,
      colore: this.homeform.value.colore
    }).subscribe({
      next: ((resp:any) => {
        this.homeform.reset();
        this.stato.set({
          msg: resp,
          isError: false
        })
        console.log(this.stato().msg + " " + this.stato().isError);

      }),
      error: ((resp:any) => {
        this.stato.set({
          msg:resp.error,
          isError : true
        })
        console.log(this.stato().msg + " " + this.stato().isError);
      })
    })




  }

}
