import { Component } from '@angular/core';
import { AuthService } from './services/auth/auth.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  showProfile: boolean;
  showTabs: boolean;

  constructor(private authService: AuthService, private navController: NavController) {
    this.authService.getCurrentUser().then(currentUser=>{
      if(currentUser && currentUser.emailVerified){
        this.showProfile = true;
        this.showTabs = true;
      }
      else{
        this.showProfile = false;
        this.showTabs = false;
      }
    })
  }

  back(){
    this.navController.back();
  }

}
