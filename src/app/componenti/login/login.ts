import { Component, signal } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UtenteService } from '../../services/utente-service';
import { AuthServices } from '../../auth/auth-services';
import { Router } from '@angular/router';
import { ConfigService } from '../../services/config-service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  msg = signal<string>('');

  constructor(private utente:UtenteService,
              private auth:AuthServices,
              private routing:Router
  ){
  }

  onSubmit(signin: NgForm){
    this.utente.signin({
      username: signin.form.value.userName,
      pwd: signin.form.value.password
    }).subscribe({
      next: ((resp:any) => {
        this.msg.set("");
        console.log("Role:" + resp.role)
        
        this.auth.setAutentificated();

        if (resp.role == "ADMIN")
            this.auth.setAdmin();
        if (resp.role == "USER")
            this.auth.setUser();   

        this.routing.navigate(["/home"]);
      }),
      error: ((resp:any) => {
        console.log(resp.error)
        this.msg.set(resp.error);
      })
    })

  }

  registrazione(){
    this.routing.navigate(['/registr'])
  }
}
