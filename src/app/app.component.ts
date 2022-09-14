import { Component } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { AuthService } from './services/auth/auth.service';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  showProfile: boolean;
  showTabs: boolean;

  constructor(
    public actionSheetController: ActionSheetController,
    private authService: AuthService,
    private navController: NavController,
    private router: Router) {

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

  openActionsUser(){

  }

  back(){
    this.navController.back();
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Usuario',
      buttons: [{
          text: 'Editar Cuenta',
          handler: () => {
            this.router.navigate(['edit-account']);
          }
        },
        {
          text: 'Editar Perfil',
          handler: () => {
            this.router.navigate(['edit-profile']);
          }
        },
        {
          text: 'Cerrar Sesion',
          handler: () => {
            this.authService.signOut();
            this.router.navigate(['login']);
          }
        },
        {
          text: 'Cancelar',
          role: 'cancel'
        }]
    });
    await actionSheet.present();
  }

}
