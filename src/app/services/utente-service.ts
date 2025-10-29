import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { ConfigService } from './config-service';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtenteService {
  constructor(private http: HttpClient,
    private config: ConfigService
  ) { }

  utente = signal<any[]>([]);

  signin(body: {}) {
    return this.http.post(this.config.backendURL() + 'utente/login', body);
  }


  list(userName: string, role: string) {
  let params = new HttpParams();
  if (userName) params = params.set('userName', userName);
  if (role) params = params.set('role', role);

  this.http.get<any[]>(this.config.backendURL() + 'utente/list', { params })
    .subscribe({
      next: (resp) => {
        setTimeout(() => {            // 👈 differisce l’update
          this.utente.set(resp);
        });
      }
    });
}

  getUtente(id: number) {
    let params = new HttpParams().set('id', id);
    return this.http.get(this.config.backendURL() + 'utente/getById', { params })
  }

  create(body: {}) {
    return this.http.post(this.config.backendURL() + 'utente/create', body, { responseType: 'text' })
      .pipe(tap(() => this.list(null, null)));
  }

  update(body: {}) {
    return this.http.put(this.config.backendURL() + 'utente/update', body, { responseType: 'text' })
      .pipe(tap(() => this.list(null, null)));
  }

  remove(id: number) {
    return this.http.delete(this.config.backendURL() + "utente/delete/" + id, { responseType: 'text' })
      .pipe(tap(() => this.list(null, null)));
  }

}
