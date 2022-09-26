import { Component } from '@angular/core';
import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  showTabs: boolean;

  constructor(private authService: AuthService) {
    this.authService.getCurrentUser().subscribe(currentUser=>{
      if(currentUser && currentUser.emailVerified){
        this.showTabs = true;
      }
      else{
        this.showTabs = false;
      }
    })
  }

}
