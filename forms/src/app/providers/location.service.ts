import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database';
import * as firebase from 'firebase/app';

@Injectable()
export class LocationService {

  constructor(private $firebase: AngularFireDatabase) { }

  listByUser(key: string): FirebaseListObservable<any[]> {
    return this.$firebase.list('/locations', {
      query: {
        orderByChild: 'user',
        equalTo: key
      }
    });
  }

  get(key: string): FirebaseObjectObservable<any>{
    return this.$firebase.object(`/locations/${key}`);
  }

  update(key: string, location: any){
    const locations = this.$firebase.list('/locations');
    return locations.update(key, location);
  }

  add(location){
    const locations = this.$firebase.list('/locations');
    return locations.push(location);
  }

}
