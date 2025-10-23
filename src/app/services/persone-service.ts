import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PersoneService {
  url = 'http://localhost:8080/rest/persone/';

  constructor(private http:HttpClient){}

  listPersone(){
    return this.http.get(this.url + 'list');
  }
  getPersona(id:number){
    let params = new HttpParams().set('id',id);
    return this.http.get(this.url + "getById", { params});
  }

  updatePersona(body:{}){
    return this.http.put(this.url + "update", body , { responseType: 'text'});
  }
  insertPersona(body:{}){
    return this.http.post(this.url+ "create", body, { responseType: 'text'});
  }
  removePersona(id:number){
    return this.http.delete(this.url + "delete/" + id , { responseType: 'text'}  );
  }
}
