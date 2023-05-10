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
import {MatGridListModule} from '@angular/material/grid-list';


import { AuthenticationService } from './services/authentication.service';
import { GetDietsService } from './services/get-diets.service';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { GetGymsService } from './services/get-gyms.service';

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
    MatGridListModule
  ],
  providers: [AuthenticationService, AuthGuard,
  {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
  },
    GetGymsService,
    GetDietsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
