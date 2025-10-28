import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { tap } from 'rxjs/operators';
import { ConfigService } from './config-service';

@Injectable({
  providedIn: 'root'
})
export class PersoneService {

  constructor(private http:HttpClient,
              private config:ConfigService
  ){}
  persone = signal<any[]>([]);

  caricaPersone(){
    // console.log("caricaPersone")
    this.http.get<any[]>(this.config.backendURL() + 'persone/list')
      .subscribe({
        next: (resp) => this.persone.set(resp)
      })
  }

  listPersone(){
    return this.http.get(this.config.backendURL() + 'persone/list');
  }
  getPersona(id:number){
    let params = new HttpParams().set('id',id);
    return this.http.get(this.config.backendURL() + 'persone/getById', { params});
  }

  /*
    servizi di aggiornamente dovono aggiornare il signal persone 
  */
  updatePersona(body:{}){
    return this.http.put(this.config.backendURL() + "persone/update", body , { responseType: 'text'})
      .pipe(tap(() => this.caricaPersone()))
  }
  insertPersona(body:{}){
    return this.http.post(this.config.backendURL() + "persone/create", body, { responseType: 'text'})
     .pipe(tap(() => this.caricaPersone()))
  }
  removePersona(id:number){
    return this.http.delete(this.config.backendURL() + "persone/delete/" + id , { responseType: 'text'}  )
     .pipe(tap(() => this.caricaPersone()))
  }
}
