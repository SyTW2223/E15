import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';
import { HomepageComponent } from '../components/Home/homepage/homepage.component';
import { SignInComponent } from '../components/Authentication/sign-in/sign-in.component';
import { SignUpComponent } from '../components/Authentication/sign-up/sign-up.component';
import { ExercisePageComponent } from '../components/Exercise/exercise-page/exercise-page.component';
import { RoutinePageComponent } from '../components/Routine/routine-page/routine-page.component';
import { DietPageComponent } from '../components/Diet/diet-page/diet-page.component';
import { MapPageComponent } from '../components/Map/map-page/map-page.component';
import { AdviserPageComponent } from '../components/Adviser/adviser-page/adviser-page.component';
import { ProfilePageComponent } from '../components/profile-page/profile-page.component';

import { AuthGuard } from '../guard/auth.guard';

const routes: Routes = [
  { path: '', component: HomepageComponent, pathMatch: 'full'  },
  { path: 'home', component: HomepageComponent},
  { path: 'sign-in', component: SignInComponent },
  { path: 'sign-up', component: SignUpComponent },
  //{ path: 'exercises', component: ExerciseListComponent, canActivate: [AuthGuard]},
  { path: 'exercises', component: ExercisePageComponent},
  { path: 'routines', component: RoutinePageComponent},
  { path: 'diets', component: DietPageComponent},
  { path: 'map', component: MapPageComponent},
  { path: 'adviser', component: AdviserPageComponent},
  { path: 'profile', component: ProfilePageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }