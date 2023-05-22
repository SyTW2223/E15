import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { AppRoutingModule } from './modules/app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HomepageComponent } from './components/Home/homepage/homepage.component';
import { FooterComponent } from './components/Layout/footer/footer.component';
import { HeaderComponent } from './components/Layout/header/header.component';
import { ProfilePageComponent } from './components/profile-page/profile-page.component';

import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox'
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog'
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';


import { AuthenticationService } from './services/authentication.service';
import { DietsService } from './services/diets.service';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { GymsService } from './services/gyms.service';
import { RoutinesService } from './services/routines.service';
import { ExercisesService } from './services/exercises.service';
import { UsersService } from './services/users.service';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SignInComponent } from './components/Authentication/sign-in/sign-in.component';
import { SignUpComponent } from './components/Authentication/sign-up/sign-up.component';
import { HomeRoutineComponent } from './components/Home/home-routine/home-routine.component';

import { AuthGuard } from './guard/auth.guard';
import { DietsComponent } from './components/Home/diets/diets.component';
import { ExercisePageComponent } from './components/Exercise/exercise-page/exercise-page.component';
import { RoutinePageComponent } from './components/Routine/routine-page/routine-page.component';
import { DietPageComponent } from './components/Diet/diet-page/diet-page.component';
import { MapPageComponent } from './components/Map/map-page/map-page.component';
import { AdviserPageComponent } from './components/Adviser/adviser-page/adviser-page.component';
import { HomeLogOutComponent } from './components/Home/home-log-out/home-log-out.component';
import { DietMenuComponent } from './components/Diet/diet-menu/diet-menu.component';
import { DietInfoComponent } from './components/Diet/diet-info/diet-info.component';
import { CreateExerciseComponent } from './components/forms/create-exercise/create-exercise.component';
import { CreateDietComponent } from './components/forms/create-diet/create-diet.component';
import { CreateGymComponent } from './components/forms/create-gym/create-gym.component';
import { UpdateGymComponent } from './components/forms/update-gym/update-gym.component';
import { UpdateExerciseComponent } from './components/forms/update-exercise/update-exercise.component';
import { UpdateDietComponent } from './components/forms/update-diet/update-diet.component';
import { DeleteGymComponent } from './components/forms/delete-gym/delete-gym.component';
import { DeleteExerciseComponent } from './components/forms/delete-exercise/delete-exercise.component';
import { DeleteDietComponent } from './components/forms/delete-diet/delete-diet.component';
import { AdviserListComponent } from './components/Adviser/adviser-list/adviser-list.component';
import { EditComponent } from './components/profile-page/edit/edit.component';
import { RoutineComponent } from './components/Routine/routine/routine.component';



@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    FooterComponent,
    HeaderComponent,
    ProfilePageComponent,
    SignInComponent,
    SignUpComponent,
    HomeRoutineComponent,
    DietsComponent,
    ExercisePageComponent,
    RoutinePageComponent,
    DietPageComponent,
    MapPageComponent,
    AdviserPageComponent,
    HomeLogOutComponent,
    DietMenuComponent,
    DietInfoComponent,
    CreateExerciseComponent,
    CreateDietComponent,
    CreateGymComponent,
    UpdateGymComponent,
    UpdateExerciseComponent,
    UpdateDietComponent,
    DeleteGymComponent,
    DeleteExerciseComponent,
    DeleteDietComponent,
    AdviserListComponent,
    EditComponent,
    RoutineComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    MatMenuModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatSnackBarModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    LeafletModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    MatGridListModule,
    MatDividerModule,
    MatListModule
  ],
  providers: [AuthenticationService, AuthGuard,
  {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
  },
    GymsService,
    DietsService,
    RoutinesService,
    ExercisesService,
    UsersService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
