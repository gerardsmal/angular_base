import { Component, signal } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UtenteService } from '../../services/utente-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registrazione',
  standalone: false,
  templateUrl: './registrazione.html',
  styleUrl: './registrazione.css'
})
export class Registrazione {

  msg = signal<string>('');

  constructor(private utente:UtenteService,
              private router:Router
  ){}

  onSubmit(signup: NgForm){
    this.utente.create({
      username: signup.form.value.userName,
      pwd: signup.form.value.password,
      role:'USER'
    }).subscribe({
      next:((resp:any) => {
        console.log(resp);
        this.router.navigate(['/login']);
      }),
      error:((resp:any) => {
        this.msg.set(resp.error);
      })
    })

  }
}
