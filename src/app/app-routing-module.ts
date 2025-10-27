import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Home } from './componenti/home/home';
import { About } from './componenti/about/about';
import { Contact } from './componenti/contact/contact';
import { ContactDetails } from './componenti/contact-details/contact-details';
import { Notfound } from './componenti/notfound/notfound';
import { authGuard } from './auth/auth-guard';
import { authAdminGuard } from './auth/auth-admin-guard';
import { Login } from './componenti/login/login';
import { Registrazione } from './componenti/registrazione/registrazione';

const routes: Routes = [
  { path: '', pathMatch:'full', redirectTo: 'login' },
  { path: 'login', component: Login },
  { path: 'registr', component: Registrazione },
  { path: 'home', component: Home , canActivate: [authGuard]} ,
  { path: 'about', component: About },
  { path: "contact", component: Contact, canActivate:[authGuard] , 
                  canActivateChild:[authAdminGuard] ,children: [
      { path: ":id", component: ContactDetails }
    ]},
  { path: '404', component: Notfound},
  { path: '**', redirectTo:'404'}  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
