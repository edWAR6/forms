import { Component, OnInit } from '@angular/core';
import { FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { Router } from '@angular/router';

import { SecurityService } from '../providers/security.service';
import { LocationService } from '../providers/location.service';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.css']
})
export class LocationsComponent implements OnInit {
  user: any;
  locations: FirebaseListObservable<any[]>;

  constructor(private $security: SecurityService, private $location: LocationService, private router: Router) { }

  ngOnInit() {
    this.user = this.$security.user;
    this.locations = this.$location.listByUser(this.user.uid);
  }

}
