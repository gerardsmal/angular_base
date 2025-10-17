import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Home } from './componenti/home/home';
import { About } from './componenti/about/about';
import { Contact } from './componenti/contact/contact';
import { ContactDetails } from './componenti/contact-details/contact-details';
import { Notfound } from './componenti/notfound/notfound';
import { authGuard } from './auth/auth-guard';
import { authAdminGuard } from './auth/auth-admin-guard';

const routes: Routes = [
  { path: '', pathMatch:'full', redirectTo: '/home' },
  { path: 'home', component: Home },
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
