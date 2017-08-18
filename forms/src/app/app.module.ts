import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AgmCoreModule } from '@agm/core';
import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

import { MdIconModule, MdButtonModule, MdCheckboxModule, MdCardModule, MdInputModule, MdSnackBarModule, MdListModule, MdToolbarModule, MdSelectModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import 'hammerjs';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { LocationsComponent } from './locations/locations.component'
import { LocationComponent } from './location/location.component'
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

import { SecurityService } from './providers/security.service';
import { LocationService } from './providers/location.service';

export const firebaseConfig = {
  apiKey: 'AIzaSyCl0EC9M9ButMwmvXk70Ikw6VAK3CY43dI',
  authDomain: 'queposbot.firebaseapp.com',
  databaseURL: 'https://queposbot.firebaseio.com',
  storageBucket: 'queposbot.appspot.com',
  messagingSenderId: '178315795015'
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    PageNotFoundComponent,
    LocationComponent,
    LocationsComponent
  ],
  imports: [
    RouterModule.forRoot(
      [
        { path: 'login', component: LoginComponent },
        { path: 'home', component: HomeComponent, canActivate: [SecurityService] },
        { path: 'locations', component: LocationsComponent, canActivate: [SecurityService] },
        { path: 'location', component: LocationComponent, canActivate: [SecurityService] },
        { path: 'location/:id', component: LocationComponent, canActivate: [SecurityService] },
        { path: '',
          redirectTo: '/locations',
          pathMatch: 'full'
        },
        { path: '**', component: PageNotFoundComponent }
      ],
      { enableTracing: true }
    ),
    BrowserModule,
    AngularFireModule.initializeApp(firebaseConfig),
    BrowserAnimationsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyClWRr8VE5aSsIq70K4anSqE1mdZS4Wbi8'
    }),
    MdIconModule,
    MdButtonModule,
    MdCheckboxModule,
    MdCardModule,
    MdInputModule,
    MdSnackBarModule,
    MdListModule,
    MdToolbarModule,
    MdSelectModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [AngularFireAuth, AngularFireDatabase, SecurityService, LocationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
