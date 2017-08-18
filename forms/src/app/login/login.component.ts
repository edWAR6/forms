import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MapTypeStyle } from '@agm/core';
import { MdSnackBar } from '@angular/material';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PasswordValidator } from '../validators/password.validator';

import { SecurityService } from '../providers/security.service';

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  lat: number = 9.4302559;
  lng: number = -84.1647536;
  style: MapTypeStyle[] = [
    {
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#f5f5f5"
        }
      ]
    },
    {
      "elementType": "labels.icon",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#616161"
        }
      ]
    },
    {
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#f5f5f5"
        }
      ]
    },
    {
      "featureType": "administrative.land_parcel",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#bdbdbd"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#eeeeee"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#757575"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#e5e5e5"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#9e9e9e"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#ffffff"
        }
      ]
    },
    {
      "featureType": "road.arterial",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#757575"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#dadada"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#616161"
        }
      ]
    },
    {
      "featureType": "road.local",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#9e9e9e"
        }
      ]
    },
    {
      "featureType": "transit.line",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#e5e5e5"
        }
      ]
    },
    {
      "featureType": "transit.station",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#eeeeee"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#c9c9c9"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#9e9e9e"
        }
      ]
    }
  ];
  registrationGroup: FormGroup;
  signinGroup: FormGroup;
  registration: any;
  signin: any;

  constructor(private $security: SecurityService, private router: Router, private snackBar: MdSnackBar, private formBuilder: FormBuilder) {
    this.registrationGroup = formBuilder.group({
      emailControl: new FormControl('', [Validators.required, Validators.pattern(EMAIL_REGEX)]),
      passwordControl: new FormControl('', [Validators.required, Validators.minLength(6)]),
      confirmPasswordControl: new FormControl('', [Validators.required, Validators.minLength(6)])
    }, {
      validator: PasswordValidator.MatchPassword
    });

    this.signinGroup = formBuilder.group({
      emailControl: new FormControl('', [Validators.required, Validators.pattern(EMAIL_REGEX)]),
      passwordControl: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });

    this.registration = {};
    this.signin = {};
  }

  ngOnInit() {
  }

  registerWithEmailAndPassword(valid){
    if (valid){
      this.$security.registerWithEmailAndPassword(this.registration.email, this.registration.password).then((user) => {
        // this.router.navigateByUrl('/locations');
        this.router.navigate(['/locations']);
      }).catch((error) => {
        console.error('Registration failed', error);
        this.snackBar.open(error.message, '', { duration: 2000 });
      });
    }
  }

  signinWithEmailAndPassword(valid){
    if (valid){
      this.$security.signinWithEmailAndPassword(this.signin.email, this.signin.password).then((user) => {
        // this.router.navigateByUrl('/locations');
        this.router.navigate(['/locations']);
      }).catch((error) => {
        console.error('Login failed', error);
        this.snackBar.open(error.message, '', { duration: 2000 });
      });
    }
  }

  loginWithGoogle(){
    this.$security.loginWithGoogle().then((user) => {
      // this.router.navigateByUrl('/locations');
      this.router.navigate(['/location']);
    }).catch((error) => {
      console.error('Login failed', error);
      this.snackBar.open(error.message, '', { duration: 2000 });
    });
  }

  loginWithFacebook(){
    this.snackBar.open('Facebook login temporarily disabled.', '', { duration: 2000 });
    // this.$security.loginWithFacebook().then((user) => {
    //   // this.router.navigateByUrl('/locations');
    //   this.router.navigate(['/locations']);
    // }).catch((error) => {
    //   console.error('Login failed', error);
    //   this.snackBar.open(error.message);
    // });
  }
}
