import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { SecurityService } from '../providers/security.service';
import { LocationService } from '../providers/location.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user: any;
  locations: FirebaseListObservable<any>;

  constructor(private $security: SecurityService, private $location: LocationService, private router: Router) { }

  ngOnInit() {
    this.user = this.$security.user;
    this.locations = this.$location.getByUser(this.user.uid);
  }

  save(name){
    console.log(1);
    console.log(name);
  }

}
