import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PersoneService {
  private url = 'http://localhost:8080/rest/persone/';

  constructor(private http:HttpClient){}
  persone = signal<any[]>([]);

  caricaPersone(){
    // console.log("caricaPersone")
    this.http.get<any[]>(this.url + 'list')
      .subscribe({
        next: (resp) => this.persone.set(resp)
      })
  }

  listPersone(){
    return this.http.get(this.url + 'list');
  }
  getPersona(id:number){
    let params = new HttpParams().set('id',id);
    return this.http.get(this.url + "getById", { params});
  }

  /*
    servizi di aggiornamente dovono aggiornare il signal persone 
  */
  updatePersona(body:{}){
    return this.http.put(this.url + "update", body , { responseType: 'text'})
      .pipe(tap(() => this.caricaPersone()))
  }
  insertPersona(body:{}){
    return this.http.post(this.url+ "create", body, { responseType: 'text'})
     .pipe(tap(() => this.caricaPersone()))
  }
  removePersona(id:number){
    return this.http.delete(this.url + "delete/" + id , { responseType: 'text'}  )
     .pipe(tap(() => this.caricaPersone()))
  }
}
