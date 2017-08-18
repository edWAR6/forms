import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database';
import * as firebase from 'firebase/app';

@Injectable()
export class LocationService {

  constructor(private $firebase: AngularFireDatabase) { }

  getByUser(key: string): FirebaseListObservable<any> {
    return this.$firebase.list('/locations', {
      query: {
        orderByChild: 'user',
        equalTo: key
      }
    });
  }

  // bindToUser(key: string): void{
  //   this.location = this.$firebase.object(`/locations/${key}`);
  //   this.location.subscribe(location => {
  //     if (location.hasOwnProperty('$value') && !location['$value']) {
  //       location.set({timestamp: firebase.database['ServerValue']['TIMESTAMP']})
  //     }
  //   });
  //
  //   // this.$firebase.object(`/locations/${key}`).$ref.transaction(existing => {
  //   //   if (existing) {
  //   //     this.location = existing;
  //   //   }else{
  //   //     const locations = this.$firebase.list('/locations');
  //   //     locations.push({ timestamp: 'HolA' });
  //   //   }
  //   // });
  // }

}
