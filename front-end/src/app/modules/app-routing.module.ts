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
import { ExerciseComponent } from '../components/Exercise/exercise/exercise.component';
import { DietComponent } from '../components/Diet/diet/diet.component';

import { CreateGymComponent } from '../components/forms/create-gym/create-gym.component';
import { CreateExerciseComponent } from '../components/forms/create-exercise/create-exercise.component';
import { CreateDietComponent } from '../components/forms/create-diet/create-diet.component';
import { CreateRoutineComponent } from '../components/forms/create-routine/create-routine.component';

import { UpdateGymComponent } from '../components/forms/update-gym/update-gym.component';
import { UpdateExerciseComponent } from '../components/forms/update-exercise/update-exercise.component';
import { UpdateDietComponent } from '../components/forms/update-diet/update-diet.component';
import { UpdateRoutineComponent } from '../components/forms/update-routine/update-routine.component';

import { DeleteGymComponent } from '../components/forms/delete-gym/delete-gym.component';
import { DeleteExerciseComponent } from '../components/forms/delete-exercise/delete-exercise.component';
import { DeleteDietComponent } from '../components/forms/delete-diet/delete-diet.component';
import { DeleteRoutineComponent } from '../components/forms/delete-routine/delete-routine.component';
import { AuthGuard } from '../guard/auth.guard';

const routes: Routes = [
  { path: '', component: HomepageComponent, pathMatch: 'full'  },
  { path: 'home', component: HomepageComponent},
  { path: 'sign-in', component: SignInComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'exercises', component: ExercisePageComponent, canActivate: [AuthGuard]},
  { path: 'exercises/:id', component: ExerciseComponent, canActivate: [AuthGuard]},
  { path: 'routines', component: RoutinePageComponent, canActivate: [AuthGuard]},
  { path: 'routines/:id', component: RoutineComponent, canActivate: [AuthGuard]},
  { path: 'diets', component: DietMenuComponent, canActivate: [AuthGuard]},
  { path: 'diets_list', component: DietPageComponent, canActivate: [AuthGuard]},
  { path: 'diets_list/:id', component: DietComponent, canActivate: [AuthGuard]},
  { path: 'diets_info', component: DietInfoComponent, canActivate: [AuthGuard]},
  { path: 'map', component: MapPageComponent, canActivate: [AuthGuard]},
  { path: 'adviser', component: AdviserPageComponent, canActivate: [AuthGuard]},
  { path: 'adviser_list', component: AdviserListComponent, canActivate: [AuthGuard]},
  { path: 'profile', component: ProfilePageComponent, canActivate: [AuthGuard]},
  { path: 'profile/edit', component: EditComponent, canActivate: [AuthGuard]},
  { path: 'profile/add_gym', component:  CreateGymComponent, canActivate: [AuthGuard]},
  { path: 'profile/edit_gym', component:  UpdateGymComponent, canActivate: [AuthGuard]},
  { path: 'profile/delete_gym', component:  DeleteGymComponent, canActivate: [AuthGuard]},
  { path: 'profile/add_exercise', component:  CreateExerciseComponent, canActivate: [AuthGuard]},
  { path: 'profile/edit_exercise', component:  UpdateExerciseComponent, canActivate: [AuthGuard]},
  { path: 'profile/delete_exercise', component:  DeleteExerciseComponent, canActivate: [AuthGuard]},
  { path: 'profile/add_routine', component:  CreateRoutineComponent, canActivate: [AuthGuard]},
  { path: 'profile/edit_routine', component:  UpdateRoutineComponent, canActivate: [AuthGuard]},
  { path: 'profile/delete_routine', component:  DeleteRoutineComponent, canActivate: [AuthGuard]},
  { path: 'profile/add_diet', component:  CreateDietComponent, canActivate: [AuthGuard]},
  { path: 'profile/edit_diet', component:  UpdateDietComponent, canActivate: [AuthGuard]},
  { path: 'profile/delete_diet', component:  DeleteDietComponent, canActivate: [AuthGuard]},
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }