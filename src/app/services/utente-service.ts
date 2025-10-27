import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtenteService {
   private url = 'http://localhost:8080/rest/utente/';

    constructor(private http: HttpClient){
    }

    signin(body:{}){
      return this.http.post(this.url + 'login', body);
    }

    create(body:{}){
      return this.http.post(this.url + 'create', body ,  { responseType: 'text'});
    }

}
