import { NgModule, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';

import { ConfigService } from './services/config-service'; // 👈 importa il servizio

import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatDialogModule} from '@angular/material/dialog';


import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Prova } from './componenti/prova/prova';
import { ProvaPersone } from './componenti/prova-persone/prova-persone';
import { ProvaData } from './componenti/prova-data/prova-data';
import { HighLight } from './direttiva/high-light';
import { ProvaPersoneService } from './componenti/prova-persone-service/prova-persone-service';
import { About } from './componenti/about/about';
import { Contact } from './componenti/contact/contact';
import { Home } from './componenti/home/home';
import { ContactDetails } from './componenti/contact-details/contact-details';
import { Notfound } from './componenti/notfound/notfound';
import { DeletePersona } from './dialogs/delete-persona/delete-persona';
import { Login } from './componenti/login/login';
import { Registrazione } from './componenti/registrazione/registrazione';

@NgModule({
  declarations: [
    App,
    Prova,
    ProvaPersone,
    ProvaData,
    HighLight,
    ProvaPersoneService,
    About,
    Contact,
    Home,
    ContactDetails,
    Notfound,
    DeletePersona,
    Login,
    Registrazione
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDialogModule
  ],
  providers: [
    provideHttpClient(withFetch()),
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideClientHydration(withEventReplay())
  ],
  bootstrap: [App]
})
// appModule é stato modificato per permetter a angular d'eseguire il loadURL al startup
export class AppModule {
  constructor(private configService: ConfigService) {
    // ✅ Eseguito automaticamente all’avvio dell’app
    this.configService.loadURL();
     
  }
}
