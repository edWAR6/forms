import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/do';
import { AngularFireAuth } from 'angularfire2/auth';
import { CanActivate, Router } from '@angular/router';
import * as firebase from 'firebase/app';

@Injectable()
export class SecurityService implements CanActivate {

  public authState: Observable<firebase.User>;
  public user: firebase.User;
  public isAuthenticated: boolean = false;

  constructor(private $angularFireAuth: AngularFireAuth, private $router: Router) {
    this.authState = this.$angularFireAuth.authState;
    this.authState.subscribe(user => {
      this.user = user;
    });
  }

  canActivate(): boolean{    
    if (this.user) {
     return true;
    }else{
      this.$router.navigate(['/login']);
      return false;
    }
  }

  registerWithEmailAndPassword(email, password){
    return this.$angularFireAuth.auth.createUserWithEmailAndPassword(email, password);
  }

  signinWithEmailAndPassword(email, password){
    return this.$angularFireAuth.auth.signInWithEmailAndPassword(email, password);
  }

  loginWithGoogle() {
    return this.$angularFireAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  loginWithFacebook() {
    return this.$angularFireAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider());
  }

  logout() {
    this.$angularFireAuth.auth.signOut();
    this.user = null;
  }
}
