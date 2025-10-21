import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {
  homeform : FormGroup;
  
  ngOnInit(): void {
    this.homeform = new FormGroup({
      nome: new FormControl(null, Validators.required),
      cognome : new FormControl(null, Validators.required),
      email : new FormControl(null, [Validators.required, Validators.email]),
      colore : new FormControl()
    });
  }

  onSubmit(){
    console.log("nome:" + this.homeform.value.nome);
    console.log("cognome:" + this.homeform.value.cognome);
    console.log("email:" + this.homeform.value.email);
    console.log("colore: " + this.homeform.value.colore + " updated:" + this.homeform.get("colore").touched);

  }

}
