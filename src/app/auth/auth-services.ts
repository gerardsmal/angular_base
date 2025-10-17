import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthServices {
  private isLogged:boolean = true;
  private isAdmin:boolean = false;


  isAutentificated(){
    return this.isLogged;
  }
  isRoleAdmin(){
    return this.isAdmin;
  }
}
