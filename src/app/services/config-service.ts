import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private url="config.json";

  public backendURL = signal<string | null>(null);

  constructor(private http:HttpClient){ 
  }
  private getConfig(){
    return this.http.get(this.url);
  }

  loadURL(){
    if (this.backendURL() == null){
        this.getConfig().subscribe((r:any) => {  // carica il signal con l'url
        this.backendURL.set(r.urlConfig)
      });
    } 
    
  } }
