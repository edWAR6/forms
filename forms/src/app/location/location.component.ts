import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { FirebaseObjectObservable } from 'angularfire2/database';
import { MdSnackBar } from '@angular/material';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PasswordValidator } from '../validators/password.validator';
import { AgmCoreModule, LatLngLiteral } from '@agm/core';

import { SecurityService } from '../providers/security.service';
import { LocationService } from '../providers/location.service';

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const URL_REGEX = /^(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9]\.[^\s]{2,})/;
const FACEBOOK_REGEX = /(?:https?:\/\/)?(?:www\.)?(mbasic.facebook|m\.facebook|facebook|fb)\.(com|me)\/(?:(?:\w\.)*#!\/)?(?:pages\/)?(?:[\w\-\.]*\/)*([\w\-\.]*)/ig;
const TWITTER_REGEX = /http(?:s)?:\/\/(?:www\.)?twitter\.com\/([a-zA-Z0-9_]+)/;

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit, OnDestroy {
  private key: string;
  private params: any;
  public LAT: number = 9.4302559;
  public LNG: number = -84.1647536;
  public selectedLat: number = 0;
  public selectedLng: number = 0;
  public location: FirebaseObjectObservable<any>;
  public categories: any[] = [
    {id: 'hotel', name: 'Hotel'},
    {id: 'restaurant', name: 'Restaurant'},
    {id: 'store', name: 'Store'},
    {id: 'emergency', name: 'Emergency'},
    {id: 'other', name: 'Other'}
  ];
  public locationGroup: FormGroup;

  constructor(private $route: ActivatedRoute, private $router: Router, private $security: SecurityService, private $location: LocationService, private formBuilder: FormBuilder, private $snackBar: MdSnackBar) {
    this.locationGroup = formBuilder.group({
      contactNameControl: new FormControl('', [Validators.required]),
      contactEmailControl: new FormControl('', [Validators.required, Validators.pattern(EMAIL_REGEX)]),
      contactPhoneControl: new FormControl('', [Validators.required]),
      contactAddressControl: new FormControl('', [Validators.required]),
      nameControl: new FormControl('', [Validators.required]),
      shortDescriptionControl: new FormControl('', [Validators.required]),
      descriptionControl: new FormControl('', [Validators.required]),
      categoryControl: new FormControl(''),
      emailControl: new FormControl('', [Validators.pattern(EMAIL_REGEX)]),
      phoneControl: new FormControl('', [Validators.required]),
      addressControl: new FormControl('', [Validators.required]),
      websiteControl: new FormControl('', [Validators.pattern(URL_REGEX)]),
      facebookControl: new FormControl('', [Validators.pattern(FACEBOOK_REGEX)]),
      twitterControl: new FormControl('', [Validators.pattern(TWITTER_REGEX)]),
      informationControl: new FormControl('')
    });
  }

  ngOnInit() {
    this.params = this.$route.params.subscribe((params) => {
      this.key = params['id'];
      if (this.key) {
        this.loadLocation();
      }
    });
  }

  ngOnDestroy() {
    this.params.unsubscribe();
  }

  loadLocation(){
    this.location = this.$location.get(this.key);
    this.location.subscribe(location => {
      this.selectedLat = location.latitude? location.latitude : 0;
      this.selectedLng = location.longitude? location.longitude : 0;
    });
  }

  save(){
    if (this.locationGroup.valid){
      let user = this.$security.user;
      let contact = {
        name: this.locationGroup.controls['contactNameControl'].value,
        email: this.locationGroup.controls['contactEmailControl'].value,
        phone: this.locationGroup.controls['contactPhoneControl'].value,
        address: this.locationGroup.controls['contactAddressControl'].value
      };
      let location = {
        user: user.uid,
        contact: contact,
        name: this.locationGroup.controls['nameControl'].value,
        shortDescription: this.locationGroup.controls['shortDescriptionControl'].value,
        description: this.locationGroup.controls['descriptionControl'].value,
        category: this.locationGroup.controls['categoryControl'].value? this.locationGroup.controls['categoryControl'].value : null,
        email: this.locationGroup.controls['emailControl'].value? this.locationGroup.controls['emailControl'].value : null,
        phone: this.locationGroup.controls['phoneControl'].value,
        address: this.locationGroup.controls['addressControl'].value,
        website: this.locationGroup.controls['websiteControl'].value? this.locationGroup.controls['websiteControl'].value: null,
        facebook: this.locationGroup.controls['facebookControl'].value? this.locationGroup.controls['facebookControl'].value : null,
        twitter: this.locationGroup.controls['twitterControl'].value? this.locationGroup.controls['twitterControl'].value : null,
        information: this.locationGroup.controls['informationControl'].value? this.locationGroup.controls['informationControl'].value : null,
        latitude: this.selectedLat,
        longitude: this.selectedLng
      };
      if (this.key) {
        this.$location.update(this.key, location).then(()=>{
          this.$snackBar.open('Location updated.', '', { duration: 2000 });
          this.$router.navigate(['/locations']);
        });
      }else{
        this.$location.add(location).then(()=>{
          this.$snackBar.open('New location added.', '', { duration: 2000 });
          this.$router.navigate(['/locations']);
        });
      }
    }else{
      this.$snackBar.open('Please fix the form errors.', '', { duration: 2000 });
    }
  }

  mapClicked(coords: LatLngLiteral) {
    this.selectedLat = coords.lat;
    this.selectedLng = coords.lng;
  }
}
