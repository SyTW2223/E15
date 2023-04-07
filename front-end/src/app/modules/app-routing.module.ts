import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';
import { HomepageComponent } from '../components/Home/homepage/homepage.component';

import { SignInComponent } from '../components/Authentication/sign-in/sign-in.component';
import { SignUpComponent } from '../components/Authentication/sign-up/sign-up.component';

const routes: Routes = [
  { path: '', component: HomepageComponent, pathMatch: 'full'  },
  { path: 'home', component: HomepageComponent},
  { path: 'sign-in', component: SignInComponent },
  { path: 'sign-up', component: SignUpComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }