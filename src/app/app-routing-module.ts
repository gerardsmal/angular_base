import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Home } from './componenti/home/home';
import { About } from './componenti/about/about';
import { Contact } from './componenti/contact/contact';

const routes: Routes = [
  { path:'' , component:Home},
  { path:'about' , component: About},
  { path:"contact", component: Contact},
  { path:"contact/:id", component: Contact}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
