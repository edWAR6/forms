import { Component } from '@angular/core';
import { SecurityService } from './providers/security.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  user: any;

  constructor(private $security: SecurityService, private $router: Router){
    $security.authState.subscribe(user => {
      if (user) {
        this.user = {name: user.displayName ? user.displayName : user.email};
      }
    });
  }

  logout(){
    this.$security.logout();
    this.user = null;
    this.$router.navigate(['/login']);
  }
}
