import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';
import { HomepageComponent } from '../components/Home/homepage/homepage.component';
import { SignInComponent } from '../components/Authentication/sign-in/sign-in.component';
import { SignUpComponent } from '../components/Authentication/sign-up/sign-up.component';
import { ExercisePageComponent } from '../components/Exercise/exercise-page/exercise-page.component';
import { RoutinePageComponent } from '../components/Routine/routine-page/routine-page.component';
import { RoutineComponent } from '../components/Routine/routine/routine.component';
import { DietPageComponent } from '../components/Diet/diet-page/diet-page.component';
import { MapPageComponent } from '../components/Map/map-page/map-page.component';
import { AdviserPageComponent } from '../components/Adviser/adviser-page/adviser-page.component';
import { ProfilePageComponent } from '../components/profile-page/profile-page.component';
import { DietInfoComponent } from '../components/Diet/diet-info/diet-info.component';
import { DietMenuComponent } from '../components/Diet/diet-menu/diet-menu.component';
import { EditComponent } from '../components/profile-page/edit/edit.component';
import { AdviserListComponent } from '../components/Adviser/adviser-list/adviser-list.component';

import { CreateGymComponent } from '../components/forms/create-gym/create-gym.component';
import { CreateExerciseComponent } from '../components/forms/create-exercise/create-exercise.component';
import { CreateDietComponent } from '../components/forms/create-diet/create-diet.component';

import { UpdateGymComponent } from '../components/forms/update-gym/update-gym.component';
import { UpdateExerciseComponent } from '../components/forms/update-exercise/update-exercise.component';
import { UpdateDietComponent } from '../components/forms/update-diet/update-diet.component';

import { DeleteGymComponent } from '../components/forms/delete-gym/delete-gym.component';
import { DeleteExerciseComponent } from '../components/forms/delete-exercise/delete-exercise.component';
import { DeleteDietComponent } from '../components/forms/delete-diet/delete-diet.component';

import { AuthGuard } from '../guard/auth.guard';

const routes: Routes = [
  { path: '', component: HomepageComponent, pathMatch: 'full'  },
  { path: 'home', component: HomepageComponent},
  { path: 'sign-in', component: SignInComponent },
  { path: 'sign-up', component: SignUpComponent },
  //{ path: 'exercises', component: ExerciseListComponent, canActivate: [AuthGuard]},
  { path: 'exercises', component: ExercisePageComponent},
  { path: 'routines', component: RoutinePageComponent},
  { path: 'routines/:id', component: RoutineComponent},
  { path: 'diets', component: DietMenuComponent },
  { path: 'diets_list', component: DietPageComponent },
  { path: 'diets_info', component: DietInfoComponent },
  { path: 'map', component: MapPageComponent },
  { path: 'adviser', component: AdviserPageComponent },
  { path: 'adviser_list', component: AdviserListComponent },
  { path: 'profile', component: ProfilePageComponent },
  { path: 'profile/edit', component: EditComponent },
  { path: 'profile/add_gym', component:  CreateGymComponent},
  { path: 'profile/edit_gym', component:  UpdateGymComponent},
  { path: 'profile/delete_gym', component:  DeleteGymComponent},
  { path: 'profile/add_exercise', component:  CreateExerciseComponent},
  { path: 'profile/edit_exercise', component:  UpdateExerciseComponent},
  { path: 'profile/delete_exercise', component:  DeleteExerciseComponent},
  { path: 'profile/add_diet', component:  CreateDietComponent},
  { path: 'profile/edit_diet', component:  UpdateDietComponent},
  { path: 'profile/delete_diet', component:  DeleteDietComponent},
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }