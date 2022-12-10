import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';
import { HomepageComponent } from '../components/homepage/homepage.component';
import { SingInComponent } from '../components/sing-in/sing-in.component';
import { SingUpComponent } from '../components/sing-up/sing-up.component';

const routes: Routes = [
  { path: '', component: HomepageComponent, pathMatch: 'full'  },
  { path: 'home', component: HomepageComponent},
  { path: 'sing-in', component: SingInComponent },
  { path: 'sing-up', component: SingUpComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }